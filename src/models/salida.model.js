// models/salida.model.js
const mongoose = require('mongoose');

const salidaSchema = new mongoose.Schema(
    {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        },

        cantidad: {
            type: Number,
            min: [1, 'La cantidad mínima debe ser 1'],
            required: [true, 'La cantidad a ingresar es obligatoria']
        },

        justificacion: {
            type: String,
            required: true
        },

        fechaRegistro: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'salidasInventario',
        timestamps: true, 
    }
);

const Salida = mongoose.model('Salida', salidaSchema);
module.exports = Salida;