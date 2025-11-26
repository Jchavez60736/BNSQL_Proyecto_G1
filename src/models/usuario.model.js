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
                    // Debe tener mínimo dos nombres y dos apellidos
                    const partes = value.trim().split(/\s+/);
                    return partes.length >= 4;
                },
                message: 'El nombre completo debe tener al menos dos nombres y dos apellidos'
            },
            description: 'Nombre completo del usuario (mínimo 4 palabras: 2 nombres y 2 apellidos)'
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
        collection: 'Usuarios',
        timestamps: true, // createdAt y updatedAt automáticos
    }
);

// Índices recomendados
usuarioSchema.index({ usuario: 1 }, { unique: true });
usuarioSchema.index({ correo: 1 }, { unique: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
