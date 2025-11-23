const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema(
    {
        nombreCompleto: {
            type: String,
            required: [true, 'El nombre completo es obligatorio'],
            trim: true,
            minlength: [3, 'El nombre debe tener al menos 3 caracteres']
        },
        cedula: {
            type: String,
            required: [true, 'La cédula es obligatoria'],
            unique: true,
            trim: true
        },
        telefono: {
            type: String,
            trim: true,
            match: [/^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, 
                'El número de teléfono debe tener 10 dígitos']
        },
        correo: {
            type: String,
            trim: true,
            lowercase: true,
            match: [
                /^\S+@\S+\.\S+$/,
                'El correo electrónico tiene un formato inválido'
            ]
        },
        direccion: {
            type: String,
            trim: true
        },
        iglesiaAsociada: {
            type: String,
            trim: true
        },
        fechaRegistro: {
            type: Date,
            default: Date.now
        },
        estado: {
            type: String,
            enum: ['Activo', 'Inactivo'],
            default: 'Activo'
        }
    },
    {
        collection: 'personas',
        timestamps: true
    }
);

// Índices para optimizar consultas
personaSchema.index({ cedula: 1 }, { unique: true });
personaSchema.index({ iglesiaAsociada: 1 });

const Persona = mongoose.model('Persona', personaSchema);

module.exports = Persona;
