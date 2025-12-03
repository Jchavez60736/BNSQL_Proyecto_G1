// routes/evento.routes.js
const express = require('express');
const router = express.Router();

const {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento
} = require('../controllers/evento.controller');

router.post('/', crearEvento);
router.get('/', obtenerEventos);
router.get('/:id', obtenerEventoPorId);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);

module.exports = router;
