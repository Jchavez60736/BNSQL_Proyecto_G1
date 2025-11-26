// routes/devolucion.routes.js
const express = require('express');
const router = express.Router();

const {
    crearDevolucion,
    obtenerDevoluciones,
    obtenerDevolucionPorId,
    actualizarDevolucion,
    eliminarDevolucion
} = require('../controllers/devolucion.controller');

// Rutas base: /api/devoluciones

// Crear nueva devolución
router.post('/', crearDevolucion);

// Listar devoluciones (con filtros opcionales: ?prestamo=...&persona=...)
router.get('/', obtenerDevoluciones);

// Obtener una devolución por ID
router.get('/:id', obtenerDevolucionPorId);

// Actualizar una devolución
router.put('/:id', actualizarDevolucion);

// Eliminar una devolución (borrado físico)
router.delete('/:id', eliminarDevolucion);

module.exports = router;
