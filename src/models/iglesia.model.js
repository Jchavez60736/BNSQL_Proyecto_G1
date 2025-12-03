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
        }
    },
    {
        collection: 'iglesias',
        timestamps: true,
    }
);

const Iglesia = mongoose.model('Iglesia', iglesiaSchema);
module.exports = Iglesia;
