const mongoose = require('mongoose');

const detalleDevolucionSchema = new mongoose.Schema(
    {
        idItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: [true, 'El identificador del ítem es obligatorio']
        },
        cantidad: {
            type: Number,
            required: [true, 'La cantidad devuelta es obligatoria'],
            min: [1, 'La cantidad mínima devuelta debe ser 1']
        },
        estadoDevolucion: {
            type: String,
            enum: ['Bueno', 'Dañado', 'Reparación requerida', 'Otro'],
            default: 'Bueno'
        },
        observaciones: {
            type: String,
            trim: true
        }
    },
    { _id: false } // no necesitamos _id por cada detalle
);

const devolucionSchema = new mongoose.Schema(
    {
        fechaDevolucion: {
            type: Date,
            required: [true, 'La fecha de devolución es obligatoria']
        },
        idPrestamo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Prestamo',
            required: [true, 'El identificador del préstamo asociado es obligatorio']
        },
        idPersonaDevuelve: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Persona',
            required: [true, 'La persona que realiza la devolución es obligatoria']
        },
        detalles: {
            type: [detalleDevolucionSchema],
            validate: {
                validator: function (value) {
                    return value && value.length > 0;
                },
                message: 'Debe registrar al menos un ítem en la devolución'
            }
        },
        observacionesGenerales: {
            type: String,
            trim: true
        },
        fechaRegistro: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'devoluciones',
        timestamps: true // createdAt y updatedAt automáticos
    }
);

// Índices recomendados
devolucionSchema.index({ idPrestamo: 1 });
devolucionSchema.index({ idPersonaDevuelve: 1 });
devolucionSchema.index({ fechaDevolucion: -1 });

const Devolucion = mongoose.model('Devolucion', devolucionSchema);

module.exports = Devolucion;
