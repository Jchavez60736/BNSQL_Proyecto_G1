const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { ensureAuth } = require('./middlewares/authMiddleware');

const usuarioRoutes = require('./routes/usuario.routes');
const iglesiasRoutes = require('./routes/iglesias.routes');
const personaRoutes = require('./routes/persona.routes'); 
const proveedoresRoutes = require('./routes/proveedores.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const itemRoutes = require('./routes/item.routes');
const entradaRoutes = require('./routes/entrada.routes');
const salidaRoutes = require('./routes/salida.routes');
const inventarioRoutes = require('./routes/inventario.routes');
const eventoRoutes = require('./routes/evento.routes');
const prestamoRoutes = require('./routes/prestamo.routes');
const devolucionRoutes = require('./routes/devolucion.routes');
const mantenimientoRoutes = require('./routes/mantenimiento.routes');

const expressLayouts = require('express-ejs-layouts');

const app = express();

connectDB();

console.log('Sirviendo archivos estáticos desde:', path.join(__dirname, '..', 'public'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));   
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(
    session({
        secret: 'supersecretkey',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/MOM_DB' }),
    })
);

app.use(authRoutes);

app.use('/api/usuarios', ensureAuth, usuarioRoutes);
app.use('/api/iglesias', ensureAuth, iglesiasRoutes); 
app.use('/api/personas', ensureAuth, personaRoutes);
app.use('/api/proveedores', ensureAuth, proveedoresRoutes);
app.use('/api/categorias', ensureAuth, categoriaRoutes); 
app.use('/api/items', ensureAuth, itemRoutes);
app.use('/api/entradas', ensureAuth, entradaRoutes);
app.use('/api/salidas', ensureAuth, salidaRoutes);
app.use('/api/inventario', ensureAuth, inventarioRoutes);
app.use('/api/eventos', ensureAuth, eventoRoutes);
app.use('/api/prestamos', ensureAuth, prestamoRoutes);
app.use('/api/devoluciones', ensureAuth, devolucionRoutes);
app.use('/api/mantenimientos', ensureAuth, mantenimientoRoutes);

app.get('/home', ensureAuth, (req, res) => {
    res.render('home', {
        layout: 'layout',
        titulo: 'Inicio',
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/test-css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'css', 'styles.css'));
});

app.get('/usuarios', ensureAuth, (req, res) =>{
    res.render('usuarios', {
        layout: 'layout',
        titulo: "Gestión de Usuarios",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/iglesias', ensureAuth, (req, res) =>{
    res.render('iglesias', {
        layout: 'layout',
        titulo: "Gestión de Iglesias",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/personas', ensureAuth, (req, res) =>{
    res.render('personas', {
        layout: 'layout',
        titulo: "Gestión de Personas",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/proveedores', ensureAuth, (req, res) => {
    res.render('proveedores', {
        layout: 'layout',
        titulo: "Gestión de Proveedores",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/categorias', ensureAuth, (req, res) => {
    res.render('categorias', {
        layout: 'layout',
        titulo: "Gestión de Categorías",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/items', ensureAuth, (req, res) => {
    res.render('items', {
        layout: 'layout',
        titulo: "Gestión de Items",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/entradas', ensureAuth, (req, res) =>{
    res.render('entradas', {
        layout: 'layout',
        titulo: "Entradas de Inventario",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/salidas', ensureAuth, (req, res) =>{
    res.render('salidas', {
        layout: 'layout',
        titulo: "Salidas de Inventario",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/inventario', ensureAuth, (req, res) =>{
    res.render('consultas', {
        layout: 'layout',
        titulo: "Consultas de Inventario",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/eventos', ensureAuth, (req, res) =>{
    res.render('eventos', {
        layout: 'layout',
        titulo: "Gestión de Eventos",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/prestamos', ensureAuth, (req, res) =>{
    res.render('prestamos', {
        layout: 'layout',
        titulo: "Gestión de Préstamos",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

app.get('/devoluciones', ensureAuth, (req, res) =>{
    res.render('devoluciones', {
        layout: 'layout',
        titulo: "Gestión de Devoluciones",
        nombreCompleto: req.session.nombreCompleto,
        rol: req.session.rol
    });
});

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
