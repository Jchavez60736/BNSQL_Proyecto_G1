const Usuario = require('../models/usuario.model');
const Iglesia = require('../models/iglesia.model');
const Proveedor = require('../models/proveedor.model');
const Item = require('../models/item.model');
const Inventario = require('../models/inventario.model');
const Evento = require('../models/evento.model');
const Prestamo = require('../models/prestamo.model');
const Devolucion = require('../models/devolucion.model');
const Mantenimiento = require('../models/mantenimiento.model');

const obtenerEstadisticas = async (req, res) => {
    try {

        const usuariosCount = await Usuario.aggregate([{ $count: "total" }]);
        const iglesiasCount = await Iglesia.aggregate([{ $count: "total" }]);
        const proveedoresDireccion = await Proveedor.aggregate([
            { $match: { direccion: "San José" } },
            { $count: "total" }
        ]);
        const itemsActivos = await Item.aggregate([
            { $match: { estado: "Activo" } },
            { $count: "total" }
        ]);
        const inventarioBajoStock = await Inventario.aggregate([
            { $match: { cantidad: { $lt: 5 } } },
            { $count: "total" }
        ]);
        const consultasEnCurso = await Evento.aggregate([
            { $match: { estado: "En curso" } },
            { $count: "total" }
        ]);
        const prestamosPendientes = await Prestamo.aggregate([
            { $match: { estadoActual: "Pendiente" } },
            { $count: "total" }
        ]);
        const devolucionesDaniadas = await Devolucion.aggregate([
            { $unwind: "$detalles" },
            { $match: { "detalles.estadoDevolucion": "Dañado" } },
            { $count: "total" }
        ]);
        const mantenimientoActivo = await Mantenimiento.aggregate([
            { $match: { estado: "Activo" } },
            { $count: "total" }
        ]);

        const responsablesPendientes = await Prestamo.aggregate([
            { $match: { estadoActual: "Pendiente" } },
            {
                $lookup: {
                    from: "personas",
                    localField: "responsable",
                    foreignField: "_id",
                    as: "responsableData"
                }
            },
            {
                $unwind: {
                    path: "$responsableData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$responsableData._id",
                    nombreCompleto: { $first: "$responsableData.nombreCompleto" },
                    totalPendientes: { $sum: 1 }
                }
            },
            { $sort: { totalPendientes: -1 } }
        ]);

        res.render("estadisticas", {
            layout: "layout",
            titulo: "Estadísticas del Sistema",
            nombreCompleto: req.session.nombreCompleto,
            rol: req.session.rol,

            responsablesPendientes,
            totalUsuarios: usuariosCount[0]?.total || 0,
            totalIglesias: iglesiasCount[0]?.total || 0,
            totalProveedores: proveedoresDireccion[0]?.total || 0,
            totalItemsActivos: itemsActivos[0]?.total || 0,
            totalInventarioBajoStock: inventarioBajoStock[0]?.total || 0,
            totalConsultasEnCurso: consultasEnCurso[0]?.total || 0,
            totalPrestamosPendientes: prestamosPendientes[0]?.total || 0,
            totalDevolucionesDaniadas: devolucionesDaniadas[0]?.total || 0,
            totalMantenimientoActivo: mantenimientoActivo[0]?.total || 0
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error en estadísticas");
    }
};

module.exports = { obtenerEstadisticas };
