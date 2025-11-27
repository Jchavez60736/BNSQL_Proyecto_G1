// controllers/iglesia.controller.js
const Iglesia = require('../models/iglesia.model');

// Crear iglesia
const crearIglesia = async (req, res) => {
    try {
        const datos = req.body;

        const iglesia = new Iglesia(datos);
        const iglesiaGuardada = await iglesia.save();

        return res.status(201).json({
            ok: true,
            msg: 'Iglesia creada correctamente',
            data: iglesiaGuardada
        });
    } catch (error) {
        console.error('Error al crear iglesia:', error);

        // Error de validación del schema
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: 'Datos inválidos para crear la iglesia',
                error: error.message
            });
        }

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al crear la iglesia'
        });
    }
};

// Obtener todas las iglesias (con filtros opcionales)
const obtenerIglesias = async (req, res) => {
    try {
        const { pastorPrincipal, nombreIglesia } = req.query;
        const filtro = {};

        if (pastorPrincipal) 
            filtro.pastorPrincipal = new RegExp(pastorPrincipal, 'i');

        if (nombreIglesia) 
            filtro.nombreIglesia = new RegExp(nombreIglesia, 'i');

        const iglesias = await Iglesia.find(filtro).sort({ nombreIglesia: 1 });

        return res.json({
            ok: true,
            data: iglesias
        });
    } catch (error) {
        console.error('Error al obtener iglesias:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener las iglesias'
        });
    }
};

// Obtener iglesia por ID
const obtenerIglesiaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const iglesia = await Iglesia.findById(id);

        if (!iglesia) {
            return res.status(404).json({
                ok: false,
                msg: 'Iglesia no encontrada'
            });
        }

        return res.json({
            ok: true,
            data: iglesia
        });
    } catch (error) {
        console.error('Error al obtener iglesia por ID:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener la iglesia'
        });
    }
};

// Actualizar iglesia
const actualizarIglesia = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const iglesiaActualizada = await Iglesia.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!iglesiaActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'Iglesia no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Iglesia actualizada correctamente',
            data: iglesiaActualizada
        });
    } catch (error) {
        console.error('Error al actualizar iglesia:', error);

        // Errores del schema (ej: teléfono inválido)
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: 'Datos inválidos para actualizar la iglesia',
                error: error.message
            });
        }

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar la iglesia'
        });
    }
};

// Eliminar iglesia
const eliminarIglesia = async (req, res) => {
    try {
        const { id } = req.params;

        const iglesiaEliminada = await Iglesia.findByIdAndDelete(id);

        if (!iglesiaEliminada) {
            return res.status(404).json({
                ok: false,
                msg: 'Iglesia no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Iglesia eliminada correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar iglesia:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar la iglesia'
        });
    }
};

module.exports = {
    crearIglesia,
    obtenerIglesias,
    obtenerIglesiaPorId,
    actualizarIglesia,
    eliminarIglesia
};
