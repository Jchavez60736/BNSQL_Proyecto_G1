// controllers/prestamo.controller.js
const Prestamo = require('../models/prestamo.model');

// Crear préstamo
const crearPrestamo = async (req, res) => {
    try {
        const datos = req.body;

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

// Obtener todos los préstamos
const obtenerPrestamos = async (req, res) => {
    try {
        const { iglesia, estado } = req.query;
        const filtro = {};

        if (iglesia) {
            filtro.iglesiaAsociada = iglesia;
        }
        if (estado) {
            filtro.estadoActual = estado;
        }

        const prestamos = await Prestamo.find(filtro)
            .sort({ fechaInicio: -1 })
            .populate('responsable')
            .populate('participantes.persona');

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

// Obtener préstamo por ID
const obtenerPrestamoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const prestamo = await Prestamo.findById(id)
            .populate('responsable')
            .populate('participantes.persona');

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

// Actualizar préstamo
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

// "Eliminar" préstamo → borrado lógico (estadoActual = 'Cancelado')
const eliminarPrestamo = async (req, res) => {
    try {
        const { id } = req.params;

        const prestamo = await Prestamo.findByIdAndUpdate(
            id,
            { estadoActual: 'Cancelado' },
            { new: true }
        );

        if (!prestamo) {
            return res.status(404).json({
                ok: false,
                msg: 'Préstamo no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Préstamo marcado como Cancelado',
            data: prestamo
        });
    } catch (error) {
        console.error('Error al eliminar (cancelar) préstamo:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar (cancelar) el préstamo'
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
