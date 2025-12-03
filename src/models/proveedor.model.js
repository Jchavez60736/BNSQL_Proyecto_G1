const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema(
    {
        nombreProveedor: {
            type: String,
            required: [true, 'El nombre del proveedor es obligatorio'],
            trim: true,
            minlength: [3, 'El nombre debe tener al menos 3 caracteres']
        },

        personaContacto: {
            type: String,
            trim: true
        },

        telefono: {
            type: String,
            trim: true,
            match: [/^[0-9]{8}$/, 'El teléfono debe contener exactamente 8 dígitos']
        },

        correoElectronico: {
            type: String,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'El correo electrónico tiene un formato inválido']
        },

        direccion: {
            type: String,
            trim: true
        },

        observaciones: {
            type: String,
            trim: true
        }
    },
    {
        collection: 'proveedores',
        timestamps: true
    }
);

// Índices útiles
proveedorSchema.index({ nombreProveedor: 1 });

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;
