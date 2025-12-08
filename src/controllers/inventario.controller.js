// controllers/inventario.controller.js
const Inventario = require('../models/inventario.model');

const crear = async (req, res) => {
    try {
        const datos = req.body;

        const entrada = new Inventario(datos);
        const entradaGuardado = await entrada.save();

        return res.status(201).json({
            ok: true,
            msg: 'Entrada guardado en el inventario correctamente',
            data: entradaGuardado
        });
    } catch (error) {
        console.error('Error al guardar la entrada:', error);

        if (error.code === 11000 && error.keyPattern && error.keyPattern._id) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe ese item registrado'
            });
        }

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al guardar la entrada'
        });
    }
};

const obtener = async (req, res) => {
    try {
        const { buscar } = req.query;

        const filtro = [
            {$lookup: {from: "items", localField: "item", foreignField: "_id", as: "item"}},
            {$unwind: "$item"}
        ];

        if (buscar) {
            filtro.push({$match: {"item.nombreItem": {$regex: buscar, $options: "i"}}});
        }

        const entradas = await Inventario.aggregate(filtro);

        return res.json({
            ok: true,
            data: entradas
        });

    } catch (error) {
        console.error('Error al obtener entradas:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener las entradas'
        });
    }
};


const obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const entrada = await Inventario.findById(id)
        .populate('item');

        if (!entrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Entrada no encontrada'
            });
        }

        return res.json({
            ok: true,
            data: entrada
        });
    } catch (error) {
        console.error('Error al obtener entrada por ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener la entrada'
        });
    }
};

const actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const entradaActualizado = await Inventario.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!entradaActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Entrada no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Entrada actualizada correctamente',
            data: entradaActualizado
        });
    } catch (error) {
        console.error('Error al actualizar la entrada:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar la entrada'
        });
    }
};

const eliminar = async (req, res) => {
    try {
        const { id } = req.params;

        const entrada = await Inventario.findByIdAndDelete(id);

        if (!entrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Entrada no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Entrada eliminada correctamente',
            data: entrada
        });
    } catch (error) {
        console.error('Error al eliminar entrada:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar la entrada'
        });
    }
};

module.exports = {
    crear,
    obtener,
    obtenerPorId,
    actualizar,
    eliminar
};
