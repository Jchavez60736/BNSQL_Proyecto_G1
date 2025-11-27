const ensureAuth = (req, res, next) => {
    if (req.session && req.session.usuarioId) {
        return next();
    }
    return res.redirect('/login');
};

const ensureGuest = (req, res, next) => {
    if (req.session && req.session.usuarioId) {
        return res.redirect('/home');
    }
    next();
};

const roleAuth = (...roles) => {
    return (req, res, next) => {
        if (!req.session || !req.session.rol) {
            return res.status(401).send('No autenticado');
        }
        if (!roles.includes(req.session.rol)) {
            return res.status(403).send('No autorizado');
        }
        next();
    };
};

module.exports = { ensureAuth, ensureGuest, roleAuth };
