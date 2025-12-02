// controllers/usuario.controller.js
const Usuario = require('../models/usuario.model');

// Crear usuario
const crearUsuario = async (req, res) => {
    try {
        const datos = req.body;

        const usuario = new Usuario(datos);
        const usuarioGuardado = await usuario.save();

        return res.status(201).json({
            ok: true,
            msg: 'Usuario creado correctamente',
            data: usuarioGuardado
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al crear el usuario'
        });
    }
};

// Obtener todos los usuarios (con filtros opcionales)
const obtenerUsuarios = async (req, res) => {
    try {
        const { rol, estado } = req.query;
        const filtro = {};

        if (rol) filtro.rol = rol;
        if (estado) filtro.estado = estado;

        if (req.session.usuarioId) {
            filtro._id = {$ne: req.session.usuarioId};
        }
        

        const usuarios = await Usuario.find(filtro).sort({ usuario: 1 });

        return res.json({
            ok: true,
            data: usuarios
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener los usuarios'
        });
    }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        return res.json({
            ok: true,
            data: usuario
        });
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener el usuario'
        });
    }
};

// Actualizar usuario
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Usuario actualizado correctamente',
            data: usuarioActualizado
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar el usuario'
        });
    }
};

// Eliminar usuario 
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioEliminado = await Usuario.findByIdAndDelete(id);

        if (!usuarioEliminado) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar el usuario'
        });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};
