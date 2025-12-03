// models/usuario.model.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
    {
        usuario: {
            type: String,
            required: [true, 'El nombre de usuario es obligatorio'],
            minlength: [4, 'El nombre de usuario debe tener al menos 4 caracteres'],
            maxlength: [20, 'El nombre de usuario no debe superar los 20 caracteres'],
            unique: true,
            trim: true,
            description: 'Username utilizado para iniciar sesión'
        },

        nombreCompleto: {
            type: String,
            required: [true, 'El nombre completo es obligatorio'],
            trim: true,
            validate: {
                validator: function (value) {
                    const partes = value.trim().split(/\s+/);
                    return partes.length >= 3;
                },
                message: 'El nombre completo debe tener al menos un nombre y dos apellidos'
            },
            description: 'Nombre completo del usuario (mínimo 3 palabras: 1 nombre y 2 apellidos)'
        },

        correo: {
            type: String,
            required: [true, 'El correo electrónico es obligatorio'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Debe ingresar un correo electrónico válido'
            ],
            description: 'Correo institucional o personal del usuario'
        },

        contraseña: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: [10, 'La contraseña debe tener al menos 10 caracteres'],
            description: 'Contraseña encriptada con bcrypt'
        },

        rol: {
            type: String,
            required: [true, 'El rol es obligatorio'],
            enum: ['Administrador', 'Editor', 'Invitado'],
            description: 'Rol asignado dentro del sistema'
        },

        estado: {
            type: String,
            enum: ['Activo', 'Inactivo'],
            default: 'Activo',
            description: 'Indica si el usuario puede acceder al sistema'
        },

        fechaRegistro: {
            type: Date,
            default: Date.now,
            description: 'Fecha en que el usuario fue registrado'
        }
    },
    {
        collection: 'usuarios',
        timestamps: true, 
    }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
