// controllers/item.controller.js
const Item = require('../models/item.model');

const crearItem = async (req, res) => {
    try {
        const datos = req.body;

        const item = new Item(datos);
        const itemGuardado = await item.save();

        return res.status(201).json({
            ok: true,
            msg: 'Ítem creado correctamente',
            data: itemGuardado
        });
    } catch (error) {
        console.error('Error al crear ítem:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al crear el ítem'
        });
    }
};

const obtenerItems = async (req, res) => {
    try {
        const { categoria } = req.query;

        let filtro = {};

        if (categoria) {
            filtro.categoria = categoria;
        }

        const items = await Item.find(filtro);

        return res.json({
            ok: true,
            data: items
        });
    } catch (error) {
        console.error('Error al obtener ítems:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener los ítems'
        });
    }
};

const obtenerItemPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({
                ok: false,
                msg: 'Ítem no encontrado'
            });
        }

        return res.json({
            ok: true,
            data: item
        });
    } catch (error) {
        console.error('Error al obtener ítem por ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener el ítem'
        });
    }
};

const actualizarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const itemActualizado = await Item.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!itemActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Ítem no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Ítem actualizado correctamente',
            data: itemActualizado
        });
    } catch (error) {
        console.error('Error al actualizar ítem:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar el ítem'
        });
    }
};

const eliminarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByIdAndDelete(id);

        if (!item) {
            return res.status(404).json({
                ok: false,
                msg: 'Ítem no encontrado'
            });
        }

        return res.json({
            ok: true,
            msg: 'Ítem eliminado correctamente',
            data: item
        });
    } catch (error) {
        console.error('Error al eliminar ítem:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar el ítem'
        });
    }
};

module.exports = {
    crearItem,
    obtenerItems,
    obtenerItemPorId,
    actualizarItem,
    eliminarItem
};
