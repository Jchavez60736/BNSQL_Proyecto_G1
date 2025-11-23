const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { ensureAuth } = require('./middlewares/authMiddleware');

const personaRoutes = require('./routes/persona.routes'); // <<--- añadido

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

// Rutas de autenticación (login, logout, etc.)
app.use(authRoutes);

// Rutas API Personas (JSON) – protegidas si quieres
// Si quieres que solo usuarios logueados accedan, descomenta ensureAuth:
app.use('/api/personas', /* ensureAuth, */ personaRoutes);

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
