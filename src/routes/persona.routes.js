const express = require('express');
const router = express.Router();

const {
    crearPersona,
    obtenerPersonas,
    obtenerPersonaPorId,
    actualizarPersona,
    eliminarPersona
} = require('../controllers/persona.controller');

// Rutas base: /api/personas

// Crear
router.post('/', crearPersona);

// Listar todas
router.get('/', obtenerPersonas);

// Obtener por ID
router.get('/:id', obtenerPersonaPorId);

// Actualizar
router.put('/:id', actualizarPersona);

// Borrado lógico (estado = Inactivo)
router.delete('/:id', eliminarPersona);

module.exports = router;
