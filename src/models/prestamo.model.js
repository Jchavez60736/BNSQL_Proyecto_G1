const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema(
    {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: [true, 'El identificador del item es obligatorio']
        },
        cantidad: {
            type: Number,
            min: [1, 'La cantidad mínima prestada debe ser 1'],
            required: [true, 'La cantidad prestada es obligatoria']
        }
    },
    { _id: false } 
);

const prestamoSchema = new mongoose.Schema(
    {
        nombrePrestamo: {
            type: String,
            required: true
        },
        evento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Evento', 
            required: [true, 'El evento es obligatorio']
        },
        fechaPrestamo: {
            type: Date,
            default: Date.now
        },
        fechaDevolucionPrevista: {
            type: Date,
            required: [true, 'La fecha de devolución prevista es obligatoria']
        },
        responsable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Persona',
            required: [true, 'La persona responsable es obligatoria']
        },
        items: [itemsSchema],
        observaciones: {
            type: String,
            trim: true
        },
        estadoActual: {
            type: String,
            enum: ['Pendiente', 'Activo', 'Finalizado', 'Cancelado'],
            default: 'Pendiente'
        }
    },
    {
        collection: 'prestamos',
        timestamps: true 
    }
);

const Prestamo = mongoose.model('Prestamo', prestamoSchema);
module.exports = Prestamo;