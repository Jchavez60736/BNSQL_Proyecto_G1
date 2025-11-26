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

// Rutas base: /api/categorias

// Crear nueva categoria
router.post('/', crearCategoria);

// Listar todas las categorias
router.get('/', obtenerCategorias);

// Obtener una categoria por ID
router.get('/:id', obtenerCategoriaPorId);

// Actualizar una Categoria
router.put('/:id', actualizarCategoria);

router.delete('/:id', eliminarCategoria);

module.exports = router;
