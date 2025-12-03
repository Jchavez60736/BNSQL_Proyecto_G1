// routes/entrada.routes.js
const express = require('express');
const router = express.Router();

const {
    crearEntrada,
    obtenerEntradas,
    obtenerEntradaPorId,
    actualizarEntrada,
    eliminarEntrada
} = require('../controllers/entrada.controller');

router.post('/', crearEntrada);
router.get('/', obtenerEntradas);
router.get('/:id', obtenerEntradaPorId);
router.put('/:id', actualizarEntrada);
router.delete('/:id', eliminarEntrada);

module.exports = router;
