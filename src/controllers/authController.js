const authService = require('../services/authService');

exports.renderLogin = (req, res) => {
    res.render('login', { 
        layout: false,
        error: null,
        nombreCompleto: null,
        rol: null
     });
};

exports.loginUser = async (req, res) => {
    const { usuario, contraseña } = req.body;
    const user = await authService.validateCredentials(usuario, contraseña);

    if (!user) {
        return res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }

    req.session.userId = user._id;
    req.session.usuario = user.usuario;
    req.session.nombreCompleto = user.nombreCompleto;
    req.session.rol = user.rol;

    res.redirect('/home');

};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};
