// controllers/entrada.controller.js
const Entrada = require('../models/entrada.model');

const crearEntrada = async (req, res) => {
    try {
        const datos = req.body;

        const entrada = new Entrada(datos);
        const entradaGuardado = await entrada.save();

        return res.status(201).json({
            ok: true,
            msg: 'Entrada guardada correctamente',
            data: entradaGuardado
        });
    } catch (error) {
        console.error('Error al guardar la entrada:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al guardar la entrada'
        });
    }
};

const obtenerEntradas = async (req, res) => {
    try {
        const entradas = await Entrada.find()
        .sort({ fechaRegistro: -1 })
        .populate('item')
        .populate('proveedor');

        return res.json({
            ok: true,
            data: entradas
        });
    } catch (error) {
        console.error('Error al obtener entradas:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener las entradas'
        });
    }
};

const obtenerEntradaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const entrada = await Entrada.findById(id)
        .populate('item')
        .populate('proveedor');

        if (!entrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Entrada no encontrada'
            });
        }

        return res.json({
            ok: true,
            data: entrada
        });
    } catch (error) {
        console.error('Error al obtener entrada por ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener la entrada'
        });
    }
};

const actualizarEntrada = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const entradaActualizado = await Entrada.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!entradaActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Entrada no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Entrada actualizada correctamente',
            data: entradaActualizado
        });
    } catch (error) {
        console.error('Error al actualizar la entrada:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar la entrada'
        });
    }
};

const eliminarEntrada = async (req, res) => {
    try {
        const { id } = req.params;

        const entrada = await Entrada.findByIdAndDelete(id);

        if (!entrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Entrada no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Entrada eliminada correctamente',
            data: entrada
        });
    } catch (error) {
        console.error('Error al eliminar entrada:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar la entrada'
        });
    }
};

module.exports = {
    crearEntrada,
    obtenerEntradas,
    obtenerEntradaPorId,
    actualizarEntrada,
    eliminarEntrada
};
