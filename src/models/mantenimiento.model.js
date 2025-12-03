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
            required: [true, 'La fecha de finalización del mantenimiento es obligatoria']

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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Persona',
            required: [true, 'El responsable del mantenimiento es obligatorio'],
            trim: true
        },
        resultado: {
            type: String,
            trim: true
        },
        observaciones: {
            type: String,
            trim: true
        },
        estado: {
            type: String,
            enum: ['Activo', 'Cerrado', 'Cancelado'],
            default: 'Activo'
        }
    },
    {
        collection: 'mantenimientos',
        timestamps: true  
    }
);

const Mantenimiento = mongoose.model('Mantenimiento', mantenimientoSchema);

module.exports = Mantenimiento;
