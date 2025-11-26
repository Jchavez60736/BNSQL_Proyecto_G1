const Mantenimiento = require('../models/mantenimiento.model');

// Crear mantenimiento
const crearMantenimiento = async (req, res) => {
    try {
        const datos = req.body;

        const mantenimiento = new Mantenimiento(datos);
        const mantenimientoGuardado = await mantenimiento.save();

        return res.status(201).json({
            ok: true,
            msg: 'Mantenimiento creado correctamente',
            data: mantenimientoGuardado
        });
    } catch (error) {
        console.error('Error al crear mantenimiento:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al crear el mantenimiento'
        });
    }
};

// Listar todos los mantenimientos
const obtenerMantenimientos = async (req, res) => {
    try {
        const mantenimientos = await Mantenimiento
            .find()
            .sort({ fechaInicio: -1 })
            .populate('idItem'); // si luego se agrega modelo Item

        return res.json({
            ok: true,
            data: mantenimientos
        });
    } catch (error) {
        console.error('Error al obtener mantenimientos:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener los mantenimientos'
        });
    }
};

// Obtener mantenimiento por ID
const obtenerMantenimientoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const mantenimiento = await Mantenimiento
            .findById(id)
            .populate('idItem');

        if (!mantenimiento) {
            return res.status(404).json({
                ok: false,
                msg: 'Mantenimiento no encontrado'
            });
        }

        return res.json({
            ok: true,
            data: mantenimiento
        });
    } catch (error) {
        console.error('Error al obtener mantenimiento por ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener el mantenimiento'
        });
    }
};

// Actualizar mantenimiento
const actualizarMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const mantenimientoActualizado = await Mantenimiento.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!mantenimientoActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Mantenimiento no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Mantenimiento actualizado correctamente',
            data: mantenimientoActualizado
        });
    } catch (error) {
        console.error('Error al actualizar mantenimiento:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar el mantenimiento'
        });
    }
};

// Eliminar mantenimiento 
const eliminarMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;

        const mantenimiento = await Mantenimiento.findByIdAndDelete(id);

        if (!mantenimiento) {
            return res.status(404).json({
                ok: false,
                msg: 'Mantenimiento no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Mantenimiento eliminado correctamente',
            data: mantenimiento
        });
    } catch (error) {
        console.error('Error al eliminar mantenimiento:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar mantenimiento'
        });
    }
};

module.exports = {
    crearMantenimiento,
    obtenerMantenimientos,
    obtenerMantenimientoPorId,
    actualizarMantenimiento,
    eliminarMantenimiento
};
