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

router.post('/', crearItem);
router.get('/', obtenerItems);
router.get('/:id', obtenerItemPorId);
router.put('/:id', actualizarItem);
router.delete('/:id', eliminarItem);

module.exports = router;
