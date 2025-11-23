const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { ensureAuth } = require('./middlewares/authMiddleware');

const personaRoutes = require('./routes/persona.routes'); 
const mantenimientoRoutes = require('./routes/mantenimiento.routes');
const itemRoutes = require('./routes/item.routes');
const prestamoRoutes = require('./routes/prestamo.routes');
const devolucionRoutes = require('./routes/devolucion.routes');


const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

// Sesiones
app.use(
    session({
        secret: 'supersecretkey',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/MOM_DB' }),
    })
);

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout');

// Rutas de autenticación (login, logout, etc.) (para protegerlas, se usa ensureAuth)

app.use(authRoutes);
app.use('/api/personas', /* ensureAuth, */ personaRoutes);
app.use('/api/mantenimientos', /* ensureAuth, */ mantenimientoRoutes); 
app.use('/api/items', /* ensureAuth, */ itemRoutes);
app.use('/api/prestamos', /* ensureAuth, */ prestamoRoutes);
app.use('/api/devoluciones', /* ensureAuth, */ devolucionRoutes);

// Home protegido
app.get('/home', ensureAuth, (req, res) => {
    res.render('home', {
        layout: 'layout',
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/usuarios', ensureAuth, (req, res) =>{
    res.render('usuarios', {
        layout: 'layout',
        titulo: "Gestión de Usuarios",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
