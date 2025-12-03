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

router.post('/', crearPrestamo);
router.get('/', obtenerPrestamos);
router.get('/:id', obtenerPrestamoPorId);
router.put('/:id', actualizarPrestamo);
router.delete('/:id', eliminarPrestamo);

module.exports = router;
