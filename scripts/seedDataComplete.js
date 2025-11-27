const mongoose = require('mongoose');
const Item = require('../src/models/item.model');
const Mantenimiento = require('../src/models/mantenimiento.model');
const Iglesia = require('../src/models/iglesia.model');
const Persona = require('../src/models/persona.model');
const Proveedor = require('../src/models/proveedor.model');
const Categoria = require('../src/models/categoria.model');
const Evento = require('../src/models/evento.model');
const Prestamo = require('../src/models/prestamo.model');
const Devolucion = require('../src/models/devolucion.model');

const seedData = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/MOM_DB');
        console.log('✓ Conectado a MongoDB');

        // Limpiar datos existentes
        await Promise.all([
            Item.deleteMany({}),
            Mantenimiento.deleteMany({}),
            Iglesia.deleteMany({}),
            Persona.deleteMany({}),
            Proveedor.deleteMany({}),
            Categoria.deleteMany({}),
            Evento.deleteMany({}),
            Prestamo.deleteMany({}),
            Devolucion.deleteMany({})
        ]);
        console.log('✓ Base de datos limpiada');

        // 1. Crear Iglesias
        const iglesiasData = [
            { nombreIglesia: 'Iglesia Central', ubicacion: 'Centro', telefono: '555-0001' },
            { nombreIglesia: 'Iglesia Norte', ubicacion: 'Zona Norte', telefono: '555-0002' },
            { nombreIglesia: 'Iglesia Sur', ubicacion: 'Zona Sur', telefono: '555-0003' }
        ];
        const iglesias = await Iglesia.insertMany(iglesiasData);
        console.log('✓ 3 iglesias creadas');

        // 2. Crear Categorías
        const categoriasData = [
            { nombreCategoria: 'Audio/Video' },
            { nombreCategoria: 'Tecnología' },
            { nombreCategoria: 'Mobiliario' },
            { nombreCategoria: 'Instrumentos' }
        ];
        const categorias = await Categoria.insertMany(categoriasData);
        console.log('✓ 4 categorías creadas');

        // 3. Crear Items
        const itemsData = [
            {
                nombreItem: 'Proyector Principal',
                categoria: 'Audio/Video',
                descripcion: 'Proyector para la sala de conferencias',
                estado: 'Activo'
            },
            {
                nombreItem: 'Micrófono Inalámbrico',
                categoria: 'Audio/Video',
                descripcion: 'Micrófono para eventos y reuniones',
                estado: 'Activo'
            },
            {
                nombreItem: 'Computadora Dell',
                categoria: 'Tecnología',
                descripcion: 'Computadora de escritorio para oficina',
                estado: 'Activo'
            },
            {
                nombreItem: 'Silla Ergonómica',
                categoria: 'Mobiliario',
                descripcion: 'Silla para trabajadores',
                estado: 'Activo'
            },
            {
                nombreItem: 'Escritorio Madera',
                categoria: 'Mobiliario',
                descripcion: 'Escritorio de trabajo',
                estado: 'Activo'
            },
            {
                nombreItem: 'Piano Digital',
                categoria: 'Instrumentos',
                descripcion: 'Piano digital para eventos',
                estado: 'Activo'
            }
        ];
        const items = await Item.insertMany(itemsData);
        console.log('✓ 6 items creados');

        // 4. Crear Personas
        const personasData = [
            {
                nombreCompleto: 'Juan Pérez López',
                email: 'juan.perez@example.com',
                telefono: '555-1001',
                direccion: 'Calle Principal 123',
                idIglesia: iglesias[0]._id
            },
            {
                nombreCompleto: 'María García González',
                email: 'maria.garcia@example.com',
                telefono: '555-1002',
                direccion: 'Avenida Central 456',
                idIglesia: iglesias[1]._id
            },
            {
                nombreCompleto: 'Carlos López Martínez',
                email: 'carlos.lopez@example.com',
                telefono: '555-1003',
                direccion: 'Calle Secundaria 789',
                idIglesia: iglesias[2]._id
            },
            {
                nombreCompleto: 'Ana Martínez Rodríguez',
                email: 'ana.martinez@example.com',
                telefono: '555-1004',
                direccion: 'Plaza Mayor 321',
                idIglesia: iglesias[0]._id
            }
        ];
        const personas = await Persona.insertMany(personasData);
        console.log('✓ 4 personas creadas');

        // 5. Crear Proveedores
        const proveedoresData = [
            {
                nombreProveedor: 'TechSupply Inc',
                email: 'contact@techsupply.com',
                telefono: '555-2001',
                direccion: 'Parque Industrial'
            },
            {
                nombreProveedor: 'ElectroMart',
                email: 'sales@electromart.com',
                telefono: '555-2002',
                direccion: 'Zona Comercial Centro'
            }
        ];
        const proveedores = await Proveedor.insertMany(proveedoresData);
        console.log('✓ 2 proveedores creados');

        // 6. Crear Mantenimientos
        const mantenimientosData = [
            {
                idItem: items[0]._id,
                fechaInicio: new Date('2024-11-20T09:00:00'),
                fechaFin: new Date('2024-11-20T10:30:00'),
                tipoMantenimiento: 'Preventivo',
                descripcionProcedimiento: 'Limpieza de lentes y verificación de conexiones',
                responsable: 'Juan Pérez',
                resultado: 'Completado satisfactoriamente',
                estado: 'Cerrado',
                observaciones: 'Proyector funcionando correctamente'
            },
            {
                idItem: items[1]._id,
                fechaInicio: new Date('2024-11-21T14:00:00'),
                fechaFin: null,
                tipoMantenimiento: 'Correctivo',
                descripcionProcedimiento: 'Reemplazo de pilas y prueba de funcionalidad',
                responsable: 'María García',
                resultado: null,
                estado: 'Activo',
                observaciones: 'Pendiente de pruebas finales'
            },
            {
                idItem: items[2]._id,
                fechaInicio: new Date('2024-11-15T08:00:00'),
                fechaFin: new Date('2024-11-15T09:00:00'),
                tipoMantenimiento: 'Preventivo',
                descripcionProcedimiento: 'Revisión de software y actualización de drivers',
                responsable: 'Carlos López',
                resultado: 'Actualizaciones completadas',
                estado: 'Cerrado',
                observaciones: 'Sistema funcionando óptimamente'
            }
        ];
        const mantenimientos = await Mantenimiento.insertMany(mantenimientosData);
        console.log('✓ 3 mantenimientos creados');

        // 7. Crear Eventos
        const eventosData = [
            {
                nombreEvento: 'Reunión Mensual',
                fechaEvento: new Date('2024-12-01T10:00:00'),
                descripcion: 'Reunión de coordinación mensual',
                iglesiaAsociada: iglesias[0]._id,
                responsable: personas[0]._id,
                estado: 'Programado'
            },
            {
                nombreEvento: 'Taller de Música',
                fechaEvento: new Date('2024-12-05T15:00:00'),
                descripcion: 'Taller de capacitación musical',
                iglesiaAsociada: iglesias[1]._id,
                responsable: personas[1]._id,
                estado: 'Programado'
            }
        ];
        const eventos = await Evento.insertMany(eventosData);
        console.log('✓ 2 eventos creados');

        // 8. Crear Préstamos
        const prestamosData = [
            {
                responsable: personas[0]._id,
                fechaPrestamo: new Date('2024-11-15T10:00:00'),
                fechaDevolucionEsperada: new Date('2024-11-22T18:00:00'),
                estado: 'Activo',
                participantes: [
                    { persona: personas[0]._id, rol: 'Responsable' },
                    { persona: personas[1]._id, rol: 'Asistente' }
                ]
            },
            {
                responsable: personas[1]._id,
                fechaPrestamo: new Date('2024-11-20T14:00:00'),
                fechaDevolucionEsperada: new Date('2024-11-27T18:00:00'),
                estado: 'Activo',
                participantes: [
                    { persona: personas[1]._id, rol: 'Responsable' }
                ]
            }
        ];
        const prestamos = await Prestamo.insertMany(prestamosData);
        console.log('✓ 2 préstamos creados');

        // 9. Crear Devoluciones
        const devolucionesData = [
            {
                idPrestamo: prestamos[0]._id,
                fechaDevolucion: new Date('2024-11-22T17:00:00'),
                idPersonaDevuelve: personas[0]._id,
                detalles: [
                    {
                        idItem: items[0]._id,
                        cantidad: 1,
                        condicion: 'Bien'
                    }
                ],
                observaciones: 'Devolución completada sin problemas'
            }
        ];
        const devoluciones = await Devolucion.insertMany(devolucionesData);
        console.log('✓ 1 devolución creada');

        console.log('\n✓✓✓ Base de datos poblada exitosamente ✓✓✓\n');
        console.log('Resumen:');
        console.log('  - 3 Iglesias');
        console.log('  - 4 Categorías');
        console.log('  - 6 Items');
        console.log('  - 4 Personas');
        console.log('  - 2 Proveedores');
        console.log('  - 3 Mantenimientos');
        console.log('  - 2 Eventos');
        console.log('  - 2 Préstamos');
        console.log('  - 1 Devolución\n');

        mongoose.disconnect();
    } catch (error) {
        console.error('✗ Error:', error.message);
        mongoose.disconnect();
    }
};

seedData();
