// controllers/salida.controller.js
const Salida = require('../models/salida.model');
const Inventario = require('../models/inventario.model');

const crearSalida = async (req, res) => {
    try {
        const datos = req.body;

        const cantidad = parseInt(datos.cantidad);

        if(!cantidad || cantidad <= 0) {
            return res.status(400).json({
                ok: false,
                msg: 'La cantidad debe ser un número válido mayor que cero'
            });
        }

        const itemInventario = await Inventario.findOne({item: datos.item});
        if(!itemInventario) {
            return res.status(400).json({
                ok: false,
                msg: 'No se puede registrar la salida. El item no existe en inventario.'
            });
        }
        if(itemInventario.cantidad < cantidad) {
            return res.status(400).json({
                ok: false,
                msg: `Stock insuficiente.\nDisponible: ${itemInventario.cantidad}\nSolicitado: ${cantidad}`
            });
        }

        const salidaGuardado = await Salida.create(datos);
        itemInventario.cantidad -= cantidad;
        await itemInventario.save();

        return res.status(201).json({
            ok: true,
            msg: 'Salida guardada correctamente',
            data: salidaGuardado
        });
    } catch (error) {
        console.error('Error al guardar la salida:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al guardar la salida'
        });
    }
};

const obtenerSalidas = async (req, res) => {
    try {
        const salidas = await Salida.find()
        .sort({ fechaRegistro: -1 })
        .populate('item');

        return res.json({
            ok: true,
            data: salidas
        });
    } catch (error) {
        console.error('Error al obtener salidas:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener las salidas'
        });
    }
};

const obtenerSalidaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const salida = await Salida.findById(id)
        .populate('item');

        if (!salida) {
            return res.status(404).json({
                ok: false,
                msg: 'Salida no encontrada'
            });
        }

        return res.json({
            ok: true,
            data: salida
        });
    } catch (error) {
        console.error('Error al obtener salida por ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener la salida'
        });
    }
};

const actualizarSalida = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const salidaActualizado = await Salida.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!salidaActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Salida no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Salida actualizada correctamente',
            data: salidaActualizado
        });
    } catch (error) {
        console.error('Error al actualizar la salida:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar la salida'
        });
    }
};

const eliminarSalida = async (req, res) => {
    try {
        const { id } = req.params;

        const salida = await Salida.findByIdAndDelete(id);

        if (!salida) {
            return res.status(404).json({
                ok: false,
                msg: 'Salida no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Salida eliminada correctamente',
            data: salida
        });
    } catch (error) {
        console.error('Error al eliminar salida:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar la salida'
        });
    }
};

module.exports = {
    crearSalida,
    obtenerSalidas,
    obtenerSalidaPorId,
    actualizarSalida,
    eliminarSalida
};
