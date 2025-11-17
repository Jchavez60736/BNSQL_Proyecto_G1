const User = require('../models/User');
const bcrypt = require('bcryptjs');

class AuthService {
    async validateCredentials(usuario, contraseña) {
        const user = await User.findOne({ usuario, estado: 'Activo', rol: 'Administrador' });
        if (!user) return null;

        const match = await bcrypt.compare(contraseña, user.contraseña);
        if (!match) return null;

        const userObj = user.toObject();
        delete userObj.contraseña;
        return userObj;
    }
}

module.exports = new AuthService();
