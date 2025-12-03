const express = require('express');
const router = express.Router();

const {
    crearMantenimiento,
    obtenerMantenimientos,
    obtenerMantenimientoPorId,
    actualizarMantenimiento,
    eliminarMantenimiento
} = require('../controllers/mantenimiento.controller');

router.post('/', crearMantenimiento);
router.get('/', obtenerMantenimientos);
router.get('/:id', obtenerMantenimientoPorId);
router.put('/:id', actualizarMantenimiento);
router.delete('/:id', eliminarMantenimiento);

module.exports = router;
