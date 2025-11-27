const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { ensureAuth } = require('./middlewares/authMiddleware');

const iglesiasRoutes = require('./routes/iglesias.routes');
const personaRoutes = require('./routes/persona.routes'); 
const mantenimientoRoutes = require('./routes/mantenimiento.routes');
const itemRoutes = require('./routes/item.routes');
const eventoRoutes = require('./routes/evento.routes');
const prestamoRoutes = require('./routes/prestamo.routes');
const devolucionRoutes = require('./routes/devolucion.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const proveedoresRoutes = require('./routes/proveedores.routes');

const expressLayouts = require('express-ejs-layouts');

const app = express();

// Conectar a MongoDB
connectDB();

// Archivos estáticos (CSS, JS, imágenes) - PRIMERO, antes que todo
console.log('Sirviendo archivos estáticos desde:', path.join(__dirname, '..', 'public'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Middlewares nativos de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vistas + layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));   // src/views
app.use(expressLayouts);
app.set('layout', 'layout');

// Sesiones
app.use(
    session({
        secret: 'supersecretkey',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/MOM_DB' }),
    })
);

// Rutas de autenticación
app.use(authRoutes);

// APIs protegidas
app.use('/api/iglesias', ensureAuth, iglesiasRoutes); 
app.use('/api/personas', ensureAuth, personaRoutes);
app.use('/api/proveedores', ensureAuth, proveedoresRoutes);
app.use('/api/categorias', ensureAuth, categoriaRoutes); 
app.use('/api/items', ensureAuth, itemRoutes);
app.use('/api/eventos', ensureAuth, eventoRoutes);
app.use('/api/prestamos', ensureAuth, prestamoRoutes);
app.use('/api/devoluciones', ensureAuth, devolucionRoutes);
app.use('/api/mantenimientos', ensureAuth, mantenimientoRoutes);

// Home protegido
app.get('/home', ensureAuth, (req, res) => {
    res.render('home', {
        layout: 'layout',
        titulo: 'Inicio',
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

// Raíz → login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Ruta de prueba para verificar archivos estáticos
app.get('/test-css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'css', 'styles.css'));
});

// Vista de usuarios (ejemplo)
app.get('/usuarios', ensureAuth, (req, res) =>{
    res.render('usuarios', {
        layout: 'layout',
        titulo: "Gestión de Usuarios",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

// Vista de iglesias
app.get('/iglesias', ensureAuth, (req, res) =>{
    res.render('iglesias', {
        layout: 'layout',
        titulo: "Gestión de Iglesias",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

// Vista de personas
app.get('/personas', ensureAuth, (req, res) =>{
    res.render('personas', {
        layout: 'layout',
        titulo: "Gestión de Personas",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

// Vista de proveedores
app.get('/proveedores', ensureAuth, (req, res) => {
    res.render('proveedores', {
        layout: 'layout',
        titulo: "Gestión de Proveedores",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

// Vista de items
app.get('/items', ensureAuth, (req, res) => {
    res.render('items', {
        layout: 'layout',
        titulo: "Gestión de Items",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

// Vista de eventos
app.get('/eventos', ensureAuth, (req, res) =>{
    res.render('eventos', {
        layout: 'layout',
        titulo: "Gestión de Eventos",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

// Vista de préstamos
app.get('/prestamos', ensureAuth, (req, res) =>{
    res.render('prestamos', {
        layout: 'layout',
        titulo: "Gestión de Préstamos",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

// Vista de devoluciones
app.get('/devoluciones', ensureAuth, (req, res) =>{
    res.render('devoluciones', {
        layout: 'layout',
        titulo: "Gestión de Devoluciones",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

// Vista de mantenimientos
app.get('/mantenimientos', ensureAuth, (req, res) =>{
    res.render('mantenimientos', {
        layout: 'layout',
        titulo: "Gestión de Mantenimientos",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
