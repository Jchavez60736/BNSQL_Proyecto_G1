// models/inventario.model.js
const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema(
    {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        },

        cantidad: {
            type: Number,
            min: 0,
            required: true
        }
    },
    {
        collection: 'inventarioActual',
        timestamps: true, 
    }
);

const Inventario = mongoose.model('Inventario', inventarioSchema);
module.exports = Inventario;