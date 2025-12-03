// routes/inventario.routes.js
const express = require('express');
const router = express.Router();

const {
    crear,
    obtener,
    obtenerPorId,
    actualizar,
    eliminar
} = require('../controllers/inventario.controller');

router.post('/', crear);
router.get('/', obtener);
router.get('/:id', obtenerPorId);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

module.exports = router;
