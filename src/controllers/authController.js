// src/controllers/authController.js
// Ejemplo simplificado
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.renderLogin = (req, res) => {
    res.render('login', {
        layout: 'layout_public',
        titulo: 'Login'
    });
};

exports.loginUser = async (req, res) => {
    const { usuario, contrasena } = req.body;

    console.log(' Intento de login con usuario:', usuario);

    try {
        // Buscar usuario por nombre de usuario
        const user = await Usuario.findOne({ usuario });

        console.log(' Usuario encontrado:', user ? 'Sí' : 'No');

        if (!user) {
            console.log(' Usuario no encontrado en BD');
            return res.render('login', {
                layout: 'layout_public',
                titulo: 'Login',
                error: 'Usuario o contraseña incorrectos'
            });
        }

        // El campo de contraseña en el modelo se llama 'contraseña'
        const storedPassword = user.contraseña;

        console.log('Contraseña en BD existe:', !!storedPassword);
        console.log('Contraseña ingresada:', contrasena);

        let passwordMatches = false;

        if (storedPassword) {
            // Intentar comparar con bcrypt (si está hasheada)
            try {
                passwordMatches = await bcrypt.compare(contrasena, storedPassword);
                console.log('Comparación bcrypt:', passwordMatches);
            } catch (e) {
                console.log(' Error en bcrypt.compare:', e.message);
                passwordMatches = false;
            }

            // Si la comparación con bcrypt falla, permitir comparación en texto plano (por compatibilidad)
            if (!passwordMatches && contrasena === storedPassword) {
                console.log(' Comparación en texto plano: Coincide');
                passwordMatches = true;
            }
        }

        console.log(' Resultado final passwordMatches:', passwordMatches);

        if (!passwordMatches) {
            console.log(' Contraseña incorrecta');
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

        console.log(' Login exitoso para usuario:', usuario);

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
