// routes/categoria.routes.js
const express = require('express');
const router = express.Router();

const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categoria.controller');

router.post('/', crearCategoria);
router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoriaPorId);
router.put('/:id', actualizarCategoria);
router.delete('/:id', eliminarCategoria);

module.exports = router;
