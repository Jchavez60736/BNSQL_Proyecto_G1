const express = require('express');
const router = express.Router();

const {
    crearMantenimiento,
    obtenerMantenimientos,
    obtenerMantenimientoPorId,
    actualizarMantenimiento,
    eliminarMantenimiento
} = require('../controllers/mantenimiento.controller');

// Rutas base: /api/mantenimientos

// Crear nuevo mantenimiento
router.post('/', crearMantenimiento);

// Listar todos los mantenimientos
router.get('/', obtenerMantenimientos);

// Obtener un mantenimiento por ID
router.get('/:id', obtenerMantenimientoPorId);

// Actualizar un mantenimiento
router.put('/:id', actualizarMantenimiento);

// Borrado lógico (estado = Cancelado)
router.delete('/:id', eliminarMantenimiento);

module.exports = router;
