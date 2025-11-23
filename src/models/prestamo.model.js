const mongoose = require('mongoose');

const participanteSchema = new mongoose.Schema(
    {
        persona: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Persona',
            required: [true, 'La persona participante es obligatoria']
        },
        rol: {
            type: String,
            required: [true, 'El rol del participante es obligatorio'],
            trim: true,
            minlength: [3, 'El rol debe tener al menos 3 caracteres']
        }
    },
    { _id: false } // no necesitamos _id dentro del subdocumento
);

const prestamoSchema = new mongoose.Schema(
    {
        nombrePrestamo: {
            type: String,
            required: [true, 'El nombre del préstamo o actividad es obligatorio'],
            trim: true,
            minlength: [3, 'El nombre debe tener al menos 3 caracteres']
        },
        descripcion: {
            type: String,
            trim: true
        },
        fechaInicio: {
            type: Date,
            required: [true, 'La fecha de inicio es obligatoria']
        },
        fechaFin: {
            type: Date,
            validate: {
                validator: function (value) {
                    // fechaFin puede estar vacía, pero si viene, no puede ser antes de fechaInicio
                    return !value || value >= this.fechaInicio;
                },
                message: 'La fecha de fin no puede ser anterior a la fecha de inicio'
            }
        },
        iglesiaAsociada: {
            type:  mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: 'Iglesia',
            required: true // opcional, si siempre debe existir
        },
        responsable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Persona',
            required: [true, 'La persona responsable es obligatoria']
        },
        ubicacion: {
            type: String,
            trim: true
        },
        participantes: [participanteSchema],
        observaciones: {
            type: String,
            trim: true
        },
        estadoActual: {
            type: String,
            enum: ['Pendiente', 'Activo', 'Finalizado', 'Cancelado'],
            default: 'Pendiente'
        },
        fechaRegistro: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'prestamos',
        timestamps: true // createdAt y updatedAt automáticos
    }
);

// Índices recomendados
prestamoSchema.index({ nombrePrestamo: 1 });
prestamoSchema.index({ fechaInicio: -1 });
prestamoSchema.index({ iglesiaAsociada: 1 });
prestamoSchema.index({ responsable: 1 });

const Prestamo = mongoose.model('Prestamo', prestamoSchema);

module.exports = Prestamo;
