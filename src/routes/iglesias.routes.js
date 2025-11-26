// routes/iglesias.routes.js
const express = require('express');
const router = express.Router();

const {
    crearIglesia,
    obtenerIglesias,
    obtenerIglesiaPorId,
    actualizarIglesia,
    eliminarIglesia
} = require('../controllers/iglesias.controller');

// Rutas base: /api/iglesias

// Crear iglesia
router.post('/', crearIglesia);

// Obtener todas las iglesias
router.get('/', obtenerIglesias);

// Obtener iglesia por ID
router.get('/:id', obtenerIglesiaPorId);

// Actualizar iglesia
router.put('/:id', actualizarIglesia);

// Eliminar iglesia (borrado físico)
router.delete('/:id', eliminarIglesia);

module.exports = router;
