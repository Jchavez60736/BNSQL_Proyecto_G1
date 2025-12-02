// controllers/devolucion.controller.js
const Devolucion = require('../models/devolucion.model');

const crearDevolucion = async (req, res) => {
    try {
        const datos = req.body;

        const devolucion = new Devolucion(datos);
        const devolucionGuardada = await devolucion.save();

        return res.status(201).json({
            ok: true,
            msg: 'Devolución registrada correctamente',
            data: devolucionGuardada
        });
    } catch (error) {
        console.error('Error al crear devolución:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al crear la devolución'
        });
    }
};

const obtenerDevoluciones = async (req, res) => {
    try {
        const { prestamo, persona } = req.query;
        const filtro = {};

        if (prestamo) {
            filtro.idPrestamo = prestamo;
        }
        if (persona) {
            filtro.idPersonaDevuelve = persona;
        }

        const devoluciones = await Devolucion.find(filtro)
            .sort({ fechaDevolucion: -1 })
            .populate('idPrestamo')
            .populate('idPersonaDevuelve')
            .populate('detalles.idItem');

        return res.json({
            ok: true,
            data: devoluciones
        });
    } catch (error) {
        console.error('Error al obtener devoluciones:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener las devoluciones'
        });
    }
};

const obtenerDevolucionPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const devolucion = await Devolucion.findById(id)
            .populate('idPrestamo')
            .populate('idPersonaDevuelve')
            .populate('detalles.idItem');

        if (!devolucion) {
            return res.status(404).json({
                ok: false,
                msg: 'Devolución no encontrada'
            });
        }

        return res.json({
            ok: true,
            data: devolucion
        });
    } catch (error) {
        console.error('Error al obtener devolución por ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener la devolución'
        });
    }
};

const actualizarDevolucion = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const devolucionActualizada = await Devolucion.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!devolucionActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'Devolución no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Devolución actualizada correctamente',
            data: devolucionActualizada
        });
    } catch (error) {
        console.error('Error al actualizar devolución:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar la devolución'
        });
    }
};

const eliminarDevolucion = async (req, res) => {
    try {
        const { id } = req.params;

        const devolucionEliminada = await Devolucion.findByIdAndDelete(id);

        if (!devolucionEliminada) {
            return res.status(404).json({
                ok: false,
                msg: 'Devolución no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Devolución eliminada correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar devolución:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar la devolución'
        });
    }
};

module.exports = {
    crearDevolucion,
    obtenerDevoluciones,
    obtenerDevolucionPorId,
    actualizarDevolucion,
    eliminarDevolucion
};
