const mongoose = require('mongoose');

const iglesiaSchema = new mongoose.Schema(
    {
        nombreIglesia: {
            type: String,
            required: [true, 'El nombre de la iglesia es obligatorio'],
            minlength: [3, 'El nombre de la iglesia debe tener al menos 3 caracteres'],
            trim: true,
            description: 'Nombre oficial de la iglesia registrada en el sistema'
        },

        direccion: {
            type: String,
            required: [true, 'La dirección es obligatoria'],
            minlength: [10, 'La dirección debe tener al menos 10 caracteres'],
            trim: true,
            description: 'Dirección física completa de la iglesia'
        },

        telefono: {
            type: String,
            required: [true, 'El número de teléfono es obligatorio'],
            match: [/^[0-9]{8}$/, 'El teléfono debe contener exactamente 8 dígitos'],
            description: 'Número de teléfono principal de la iglesia'
        },

        correo: {
            type: String,
            required: [true, 'El correo electrónico es obligatorio'],
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Debe ingresar un correo electrónico válido'
            ],
            description: 'Correo electrónico institucional de la iglesia'
        },

        pastorPrincipal: {
            type: String,
            required: [true, 'El nombre del pastor principal es obligatorio'],
            minlength: [5, 'Debe ingresar el nombre completo del pastor'],
            trim: true,
            description: 'Nombre completo del pastor principal encargado'
        },

        contactoNombreCompleto: {
            type: String,
            required: [true, 'El nombre del contacto principal es obligatorio'],
            trim: true,
            validate: {
                validator: function (value) {
                    const partes = value.trim().split(/\s+/);
                    return partes.length === 4; // 2 nombres + 2 apellidos EXACTO
                },
                message: 'Debe ingresar exactamente 4 palabras: 2 nombres y 2 apellidos'
            },
            description: 'Nombre completo del contacto principal'
        },

        contactoTelefono: {
            type: String,
            required: [true, 'El teléfono del contacto es obligatorio'],
            match: [/^[0-9]{8}$/, 'El teléfono debe contener exactamente 8 dígitos'],
            description: 'Número de teléfono del contacto principal'
        },

        fechaRegistro: {
            type: Date,
            default: Date.now,
            description: 'Fecha en que la iglesia fue registrada en el sistema'
        }
    },
    {
        collection: 'Iglesias',
        timestamps: true, // agrega createdAt y updatedAt
    }
);

// Índices recomendados para búsquedas
iglesiaSchema.index({ nombreIglesia: 1 });
iglesiaSchema.index({ correo: 1 });

const Iglesia = mongoose.model('Iglesia', iglesiaSchema);
module.exports = Iglesia;
