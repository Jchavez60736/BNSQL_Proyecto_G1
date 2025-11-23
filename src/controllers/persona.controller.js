const Persona = require('../models/persona.model');

// Crear persona
const crearPersona = async (req, res) => {
    try {
        const datos = req.body;

        const persona = new Persona(datos);
        const personaGuardada = await persona.save();

        return res.status(201).json({
            ok: true,
            msg: 'Persona creada correctamente',
            data: personaGuardada
        });
    } catch (error) {
        console.error('Error al crear persona:', error);

        // Manejo básico de error de índice único (cedula duplicada)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.cedula) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una persona registrada con esa cédula'
            });
        }

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al crear la persona'
        });
    }
};

// Listar todas las personas
const obtenerPersonas = async (req, res) => {
    try {
        const personas = await Persona.find().sort({ nombreCompleto: 1 });
        return res.json({
            ok: true,
            data: personas
        });
    } catch (error) {
        console.error('Error al obtener personas:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener las personas'
        });
    }
};

// Obtener una persona por ID
const obtenerPersonaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const persona = await Persona.findById(id);

        if (!persona) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrada'
            });
        }

        return res.json({
            ok: true,
            data: persona
        });
    } catch (error) {
        console.error('Error al obtener persona por ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener la persona'
        });
    }
};

// Actualizar persona
const actualizarPersona = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const personaActualizada = await Persona.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!personaActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Persona actualizada correctamente',
            data: personaActualizada
        });
    } catch (error) {
        console.error('Error al actualizar persona:', error);

        if (error.code === 11000 && error.keyPattern && error.keyPattern.cedula) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una persona registrada con esa cédula'
            });
        }

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar la persona'
        });
    }
};

// Eliminar (borrado lógico) – cambiar estado a Inactivo
const eliminarPersona = async (req, res) => {
    try {
        const { id } = req.params;

        const persona = await Persona.findByIdAndUpdate(
            id,
            { estado: 'Inactivo' },
            { new: true }
        );

        if (!persona) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Persona marcada como Inactiva',
            data: persona
        });
    } catch (error) {
        console.error('Error al eliminar persona:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar la persona'
        });
    }
};

module.exports = {
    crearPersona,
    obtenerPersonas,
    obtenerPersonaPorId,
    actualizarPersona,
    eliminarPersona
};
