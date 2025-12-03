// models/entrada.model.js
const mongoose = require('mongoose');

const entradaSchema = new mongoose.Schema(
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

        proveedor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Proveedor',
            required: true
        },

        fechaRegistro: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'entradasInventario',
        timestamps: true, 
    }
);

const Entrada = mongoose.model('Entrada', entradaSchema);
module.exports = Entrada;