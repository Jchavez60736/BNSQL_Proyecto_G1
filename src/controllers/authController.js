// src/controllers/authController.js
// Ejemplo simplificado
const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');

exports.renderLogin = (req, res) => {
    res.render('login', {
        layout: 'layout_public',
        titulo: 'Login'
    });
};

exports.loginUser = async (req, res) => {
    const { usuario, contrasena } = req.body;

    try {
        // Buscar usuario por nombre de usuario
        const user = await Usuario.findOne({ usuario });

        if (!user) {
            return res.render('login', {
                layout: 'layout_public',
                titulo: 'Login',
                error: 'Usuario o contraseña incorrectos'
            });
        }

        // El campo de contraseña en el modelo puede llamarse 'contraseña' (con tilde)
        const storedPassword = user.contrasena || user.contrasena || user.contraseña || user.password || user.contrasena;

        let passwordMatches = false;

        if (storedPassword) {
            // Intentar comparar con bcrypt (si está hasheada)
            try {
                passwordMatches = await bcrypt.compare(contrasena, storedPassword);
            } catch (e) {
                passwordMatches = false;
            }

            // Si la comparación con bcrypt falla, permitir comparación en texto plano (por compatibilidad)
            if (!passwordMatches && contrasena === storedPassword) {
                passwordMatches = true;
            }
        }

        if (!passwordMatches) {
            return res.render('login', {
                layout: 'layout_public',
                titulo: 'Login',
                error: 'Usuario o contraseña incorrectos'
            });
        }

        // Autenticación exitosa: establecer sesión
        req.session.usuarioId = user._id;
        req.session.nombreCompleto = user.nombreCompleto || user.nombre || '';
        req.session.rol = user.rol || 'Usuario';

        return res.redirect('/home');
    } catch (err) {
        console.error('Error en loginUser:', err);
        return res.render('login', {
            layout: 'layout_public',
            titulo: 'Login',
            error: 'Error interno, intente de nuevo'
        });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
