// controllers/prestamo.controller.js
const Prestamo = require('../models/prestamo.model');
const Inventario = require('../models/inventario.model');

const crearPrestamo = async (req, res) => {
    try {
        const datos = req.body;
        const items = datos.items || [];

        if (!items.length) {
            return res.status(400).json({
                ok: false,
                msg: 'Debe agregar al menos un item al préstamo.'
            });
        }

        for (const i of items) {
            const cantidadSolicitada = parseInt(i.cantidad);
            const itemInventario = await Inventario.findOne({ item: i.item }).populate('item'); 

            if (!itemInventario) {
                return res.status(400).json({
                    ok: false,
                    msg: `Cada item tiene que estar registrado en el inventario.`
                });
            }
            if (itemInventario.cantidad < cantidadSolicitada) {
                return res.status(400).json({
                    ok: false,
                    msg: `Stock insuficiente para el item "${itemInventario.item.nombreItem}"\nDisponible: ${itemInventario.cantidad}\nSolicitado: ${cantidadSolicitada}`
                });
            }

        };

        for (const i of items) {
            const cantidadSolicitada = parseInt(i.cantidad);

            const itemInventario = await Inventario.findOne({ item: i.item });

            itemInventario.cantidad -= cantidadSolicitada;
            await itemInventario.save();
        }

        const prestamo = new Prestamo(datos);
        const prestamoGuardado = await prestamo.save();

        return res.status(201).json({
            ok: true,
            msg: 'Préstamo creado correctamente',
            data: prestamoGuardado
        });
        
    } catch (error) {
        console.error('Error al crear préstamo:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al crear el préstamo'
        });
    }
};

const obtenerPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.find()
            .sort({ fechaPrestamo: -1 })
            .populate('evento')
            .populate('responsable')
            .populate('items.item');

        return res.json({
            ok: true,
            data: prestamos
        });
    } catch (error) {
        console.error('Error al obtener préstamos:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener los préstamos'
        });
    }
};

const obtenerPrestamoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const prestamo = await Prestamo.findById(id)
            .populate('evento')
            .populate('responsable')
            .populate('items.item');


        if (!prestamo) {
            return res.status(404).json({
                ok: false,
                msg: 'Préstamo no encontrado'
            });
        }

        return res.json({
            ok: true,
            data: prestamo
        });
    } catch (error) {
        console.error('Error al obtener préstamo por ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener el préstamo'
        });
    }
};

const actualizarPrestamo = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const prestamoActualizado = await Prestamo.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!prestamoActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Préstamo no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Préstamo actualizado correctamente',
            data: prestamoActualizado
        });
    } catch (error) {
        console.error('Error al actualizar préstamo:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar el préstamo'
        });
    }
};

const eliminarPrestamo = async (req, res) => {
    try {
        const { id } = req.params;

        const prestamo = await Prestamo.findByIdAndDelete(id);

        if (!prestamo) {
            return res.status(404).json({
                ok: false,
                msg: 'Préstamo no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Préstamo eliminado correctamente',
            data: prestamo
        });
    } catch (error) {
        console.error('Error al eliminar préstamo:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar el préstamo'
        });
    }
};

module.exports = {
    crearPrestamo,
    obtenerPrestamos,
    obtenerPrestamoPorId,
    actualizarPrestamo,
    eliminarPrestamo
};
