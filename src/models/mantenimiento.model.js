const mongoose = require('mongoose');

const mantenimientoSchema = new mongoose.Schema(
    {
        idItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: [true, 'El identificador del ítem es obligatorio']
        },
        fechaInicio: {
            type: Date,
            required: [true, 'La fecha de inicio del mantenimiento es obligatoria']
        },
        fechaFin: {
            type: Date,
            validate: {
                validator: function (value) {
                    return !value || value >= this.fechaInicio;
                },
                message: 'La fecha de finalización no puede ser anterior a la fecha de inicio'
            }

        },
        tipoMantenimiento: {
            type: String,
            enum: ['Preventivo', 'Correctivo'],
            required: [true, 'El tipo de mantenimiento es obligatorio']
        },
        descripcionProcedimiento: {
            type: String,
            required: [true, 'La descripción del procedimiento es obligatoria'],
            trim: true,
            minlength: [5, 'La descripción debe tener al menos 5 caracteres']
        },
        responsable: {
            type: String,
            required: [true, 'El responsable del mantenimiento es obligatorio'],
            trim: true
            // más adelante podrías cambiarlo a ObjectId y ref: 'Usuario'
        },
        resultado: {
            type: String,
            trim: true
        },
        observaciones: {
            type: String,
            trim: true
        },
        fechaRegistro: {
            type: Date,
            default: Date.now
        },
        estado: {
            type: String,
            enum: ['Activo', 'Cerrado', 'Cancelado'],
            default: 'Activo'
        }
    },
    {
        collection: 'mantenimientos',
        timestamps: true  // createdAt y updatedAt automáticos
    }
);

// Índices recomendados
mantenimientoSchema.index({ idItem: 1 });
mantenimientoSchema.index({ tipoMantenimiento: 1, fechaInicio: -1 });

const Mantenimiento = mongoose.model('Mantenimiento', mantenimientoSchema);

module.exports = Mantenimiento;
