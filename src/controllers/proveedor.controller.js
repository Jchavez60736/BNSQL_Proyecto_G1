// controllers/proveedor.controller.js
const Proveedor = require('../models/proveedor.model');

// Crear proveedor
const crearProveedor = async (req, res) => {
    try {
        const datos = req.body;

        const proveedor = new Proveedor(datos);
        const proveedorGuardado = await proveedor.save();

        return res.status(201).json({
            ok: true,
            msg: 'Proveedor creado correctamente',
            data: proveedorGuardado
        });
    } catch (error) {
        console.error('Error al crear proveedor:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al crear el proveedor'
        });
    }
};

// Obtener todos los proveedores (con filtros opcionales)
const obtenerProveedores = async (req, res) => {
    try {
        const { tipoProveedor, estadoActual } = req.query;

        const filtro = {};

        if (tipoProveedor) filtro.tipoProveedor = tipoProveedor;
        if (estadoActual) filtro.estadoActual = estadoActual;

        const proveedores = await Proveedor.find(filtro).sort({ nombreProveedor: 1 });

        return res.json({
            ok: true,
            data: proveedores
        });
    } catch (error) {
        console.error('Error al obtener proveedores:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener los proveedores'
        });
    }
};

// Obtener proveedor por ID
const obtenerProveedorPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const proveedor = await Proveedor.findById(id);

        if (!proveedor) {
            return res.status(404).json({
                ok: false,
                msg: 'Proveedor no encontrado'
            });
        }

        return res.json({
            ok: true,
            data: proveedor
        });
    } catch (error) {
        console.error('Error al obtener proveedor por ID:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener el proveedor'
        });
    }
};

// Actualizar proveedor
const actualizarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const proveedorActualizado = await Proveedor.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!proveedorActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Proveedor no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Proveedor actualizado correctamente',
            data: proveedorActualizado
        });
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar el proveedor'
        });
    }
};

// Eliminar proveedor
const eliminarProveedor = async (req, res) => {
    try {
        const { id } = req.params;

        const proveedorEliminado = await Proveedor.findByIdAndDelete(id);

        if (!proveedorEliminado) {
            return res.status(404).json({
                ok: false,
                msg: 'Proveedor no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Proveedor eliminado correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar proveedor:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar el proveedor'
        });
    }
};

module.exports = {
    crearProveedor,
    obtenerProveedores,
    obtenerProveedorPorId,
    actualizarProveedor,
    eliminarProveedor
};
