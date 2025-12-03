// controllers/evento.controller.js
const Evento = require('../models/evento.model');

const crearEvento = async (req, res) => {
    try {
        const datos = req.body;

        const evento = new Evento(datos);
        const eventoGuardado = await evento.save();

        return res.status(201).json({
            ok: true,
            msg: 'Evento creado correctamente',
            data: eventoGuardado
        });
    } catch (error) {
        console.error('Error al crear evento:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al crear el evento'
        });
    }
};

const obtenerEventos = async (req, res) => {
    try {
        const eventos = await Evento.find()
        .populate('iglesiaAsociada') 
        .populate('responsable');   

        return res.json({
            ok: true,
            data: eventos
        });
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener los eventos'
        });
    }
};

const obtenerEventoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const evento = await Evento.findById(id)
        .populate('iglesiaAsociada') 
        .populate('responsable');   

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        return res.json({
            ok: true,
            data: evento
        });
    } catch (error) {
        console.error('Error al obtener evento por ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener el evento'
        });
    }
};

const actualizarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const eventoActualizado = await Evento.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!eventoActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Evento actualizado correctamente',
            data: eventoActualizado
        });
    } catch (error) {
        console.error('Error al actualizar evento:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar el evento'
        });
    }
};

const eliminarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await Evento.findByIdAndDelete(id);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Evento eliminado correctamente',
            data: evento
        });
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar el evento'
        });
    }
};

module.exports = {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento
};
