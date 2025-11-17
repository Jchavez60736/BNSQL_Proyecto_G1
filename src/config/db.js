const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/MOM_DB');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error al conectar MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
