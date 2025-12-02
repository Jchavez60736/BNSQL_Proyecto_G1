const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        nombreItem: {
            type: String,
            required: [true, 'El nombre del ítem es obligatorio'],
            trim: true,
            minlength: [3, 'El nombre del ítem debe tener al menos 3 caracteres']
        },
        categoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categoria',
            required: [true, 'La categoría del ítem es obligatoria']
        },
        descripcion: {
            type: String,
            trim: true
        },
        estado: {
            type: String,
            enum: ['Activo', 'En Mantenimiento', 'Inactivo'],
            default: 'Activo'
        }
    },
    {
        collection: 'items',
        timestamps: true 
    }
);


itemSchema.index({ nombreItem: 1 });
itemSchema.index({ categoria: 1 });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
