// src/controllers/authController.js
// Ejemplo simplificado
const Usuario = require('../models/usuario.model');

exports.renderLogin = (req, res) => {
    res.render('login', {
        layout: 'layout_public',
        titulo: 'Login'
    });
};

exports.loginUser = async (req, res) => {
    const { usuario, contrasena } = req.body;

    // Credenciales hardcodeadas para testing
    const usuarioHardcoded = 'admin';
    const contrasenaHardcoded = '123456';

    if (usuario === usuarioHardcoded && contrasena === contrasenaHardcoded) {
        req.session.usuarioId = 'test-id-123';
        req.session.nombreCompleto = 'Administrador Test';
        req.session.rol = 'Administrador';

        return res.redirect('/home');
    }

    return res.render('login', {
        layout: 'layout_public',
        titulo: 'Login',
        error: 'Usuario o contraseña incorrectos'
    });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
