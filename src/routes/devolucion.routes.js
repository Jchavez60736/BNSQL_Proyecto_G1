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

router.post('/', crearDevolucion);
router.get('/', obtenerDevoluciones);
router.get('/:id', obtenerDevolucionPorId);
router.put('/:id', actualizarDevolucion);
router.delete('/:id', eliminarDevolucion);

module.exports = router;
