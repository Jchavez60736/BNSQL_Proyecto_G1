const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true },       // username
    nombreCompleto: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },                 // password hash
    rol: { type: String, required: true },
    estado: { type: String, required: true }
}, { collection: 'Usuarios' });

module.exports = mongoose.model('User', userSchema);
