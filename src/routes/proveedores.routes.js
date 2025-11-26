// routes/proveedor.routes.js
const express = require('express');
const router = express.Router();

const {
    crearProveedor,
    obtenerProveedores,
    obtenerProveedorPorId,
    actualizarProveedor,
    eliminarProveedor
} = require('../controllers/proveedor.controller');

// Rutas base: /api/proveedores

// Crear proveedor
router.post('/', crearProveedor);

// Obtener todos los proveedores
router.get('/', obtenerProveedores);

// Obtener proveedor por ID
router.get('/:id', obtenerProveedorPorId);

// Actualizar proveedor
router.put('/:id', actualizarProveedor);

// Eliminar proveedor (borrado físico)
router.delete('/:id', eliminarProveedor);

module.exports = router;
