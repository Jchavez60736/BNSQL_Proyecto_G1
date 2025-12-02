const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(
    {
        nombreEvento: {
            type: String,
            required: [true, 'El nombre del evento es obligatorio'],
            trim: true
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
            required: [true, 'La fecha de finalización es obligatoria']
        },
        ubicacion: {
            type: String,
            trim: true
        },
        iglesiaAsociada: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Iglesia', 
            required: [true, 'La iglesia asociada es obligatoria']
        },
        responsable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Persona', 
            required: [true, 'La persona responsable es obligatoria']
        },
        observaciones: {
            type: String,
            trim: true
        },
        estado: {
            type: String,
            enum: ['Programado', 'En curso', 'Finalizado', 'Cancelado'],
            default: 'Programado'
        }
    },
    {
        collection: 'eventos',
        timestamps: true 
    }
);

eventoSchema.index({ nombreEvento: 1 });
eventoSchema.index({ fechaInicio: 1 });

const Evento = mongoose.model('Evento', eventoSchema);
module.exports = Evento;
