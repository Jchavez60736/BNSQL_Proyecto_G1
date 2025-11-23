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
            type: String,
            required: [true, 'La categoría del ítem es obligatoria'],
            trim: true
            // si más adelante creamos categorías fijas, podríamos usar enum
            // enum: ['Tecnología', 'Mobiliario', 'Audio/Video', 'Otro']
        },
        descripcion: {
            type: String,
            trim: true
        },
        estadoActual: {
            type: String,
            enum: ['Disponible', 'En uso', 'En mantenimiento', 'De baja'],
            default: 'Disponible'
        },
        fechaRegistro: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'items',
        timestamps: true // createdAt y updatedAt automáticos
    }
);

// Índices recomendados
itemSchema.index({ nombreItem: 1 });
itemSchema.index({ categoria: 1 });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
