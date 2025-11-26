const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre de la categoría es obligatorio'],
            trim: true
        },
        descripcion: {
            type: String,
            trim: true
        }
    },
    {
        collection: 'categorias',
        timestamps: true
    }
);

const Categoria = mongoose.model('Categoria', categoriaSchema);
module.exports = Categoria;