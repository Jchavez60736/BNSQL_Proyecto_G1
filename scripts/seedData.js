const mongoose = require('mongoose');
const Item = require('../src/models/item.model');
const Mantenimiento = require('../src/models/mantenimiento.model');

const seedData = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/MOM_DB');
        console.log('Conectado a MongoDB');

        // Limpiar datos existentes
        await Item.deleteMany({});
        await Mantenimiento.deleteMany({});
        console.log('Base de datos limpiada');

        // Crear items
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
            }
        ];

        const itemsCreados = await Item.insertMany(itemsData);
        console.log(`${itemsCreados.length} items creados`);

        // Crear mantenimientos
        const mantenimientosData = [
            {
                idItem: itemsCreados[0]._id,
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
                idItem: itemsCreados[1]._id,
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
                idItem: itemsCreados[2]._id,
                fechaInicio: new Date('2024-11-15T08:00:00'),
                fechaFin: new Date('2024-11-15T09:00:00'),
                tipoMantenimiento: 'Preventivo',
                descripcionProcedimiento: 'Revisión de software y actualización de drivers',
                responsable: 'Carlos López',
                resultado: 'Actualizaciones completadas',
                estado: 'Cerrado',
                observaciones: 'Sistema funcionando óptimamente'
            },
            {
                idItem: itemsCreados[3]._id,
                fechaInicio: new Date('2024-11-19T10:00:00'),
                fechaFin: null,
                tipoMantenimiento: 'Preventivo',
                descripcionProcedimiento: 'Ajuste de altura y verificación de mecanismos',
                responsable: 'Ana Martínez',
                resultado: null,
                estado: 'Activo',
                observaciones: 'En proceso de ajuste'
            }
        ];

        const mantenimientosCreados = await Mantenimiento.insertMany(mantenimientosData);
        console.log(`${mantenimientosCreados.length} mantenimientos creados`);

        console.log('Base de datos poblada exitosamente');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
        mongoose.disconnect();
    }
};

seedData();
