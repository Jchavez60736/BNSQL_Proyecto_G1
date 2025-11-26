// routes/prestamo.routes.js
const express = require('express');
const router = express.Router();

const {
    crearPrestamo,
    obtenerPrestamos,
    obtenerPrestamoPorId,
    actualizarPrestamo,
    eliminarPrestamo
} = require('../controllers/prestamo.controller');

// Rutas base: /api/prestamos

// Crear nuevo préstamo
router.post('/', crearPrestamo);

// Listar todos los préstamos (con filtros opcionales por query: ?iglesia=...&estado=...)
router.get('/', obtenerPrestamos);

// Obtener un préstamo por ID
router.get('/:id', obtenerPrestamoPorId);

// Actualizar un préstamo
router.put('/:id', actualizarPrestamo);

// Borrado lógico (estadoActual = 'Cancelado')
router.delete('/:id', eliminarPrestamo);

module.exports = router;
