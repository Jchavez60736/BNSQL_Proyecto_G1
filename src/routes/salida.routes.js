// routes/salida.routes.js
const express = require('express');
const router = express.Router();

const {
    crearSalida,
    obtenerSalidas,
    obtenerSalidaPorId,
    actualizarSalida,
    eliminarSalida
} = require('../controllers/salida.controller');

router.post('/', crearSalida);
router.get('/', obtenerSalidas);
router.get('/:id', obtenerSalidaPorId);
router.put('/:id', actualizarSalida);
router.delete('/:id', eliminarSalida);

module.exports = router;
