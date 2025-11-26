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
            validate: {
                validator: function (v) {
                    return !v || /^[0-9+\-\s]{8,20}$/.test(v);
                },
                message: 'El teléfono no tiene un formato válido'
            }
        },

        correoElectronico: {
            type: String,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: 'El correo electrónico no es válido'
            }
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
