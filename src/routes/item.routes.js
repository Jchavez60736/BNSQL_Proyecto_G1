// routes/item.routes.js
const express = require('express');
const router = express.Router();

const {
    crearItem,
    obtenerItems,
    obtenerItemPorId,
    actualizarItem,
    eliminarItem
} = require('../controllers/item.controller');

// Rutas base: /api/items

// Crear nuevo ítem
router.post('/', crearItem);

// Listar todos los ítems
router.get('/', obtenerItems);

// Obtener un ítem por ID
router.get('/:id', obtenerItemPorId);

// Actualizar un ítem
router.put('/:id', actualizarItem);

// Borrado lógico (estadoActual = 'Inactivo')
router.delete('/:id', eliminarItem);

module.exports = router;
