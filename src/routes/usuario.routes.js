// routes/usuario.routes.js
const express = require('express');
const router = express.Router();

const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/usuario.controller');

// Rutas base: /api/usuarios

// Crear usuario
router.post('/', crearUsuario);

// Obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Obtener usuario por ID
router.get('/:id', obtenerUsuarioPorId);

// Actualizar usuario
router.put('/:id', actualizarUsuario);

// Eliminar usuario (borrado físico)
router.delete('/:id', eliminarUsuario);

module.exports = router;
