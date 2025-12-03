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

router.post('/', crearIglesia);
router.get('/', obtenerIglesias);
router.get('/:id', obtenerIglesiaPorId);
router.put('/:id', actualizarIglesia);
router.delete('/:id', eliminarIglesia);

module.exports = router;
