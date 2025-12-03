// controllers/categoria.controller.js
const Categoria = require('../models/categoria.model');

const crearCategoria = async (req, res) => {
    try {
        const datos = req.body;

        const categoria = new Categoria(datos);
        const categoriaGuardado = await categoria.save();

        return res.status(201).json({
            ok: true,
            msg: 'categoria creado correctamente',
            data: categoriaGuardado
        });
    } catch (error) {
        console.error('Error al crear categoria:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al crear el categoria'
        });
    }
};

const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();

        return res.json({
            ok: true,
            data: categorias
        });
    } catch (error) {
        console.error('Error al obtener categorias:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener categorias'
        });
    }
};

const obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrada'
            });
        }

        return res.json({
            ok: true,
            data: categoria
        });
    } catch (error) {
        console.error('Error al obtener categoria por ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener la categoria'
        });
    }
};

const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const categoriaActualizado = await Categoria.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );

        if (!categoriaActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Categoria actualizado correctamente',
            data: categoriaActualizado
        });
    } catch (error) {
        console.error('Error al actualizar categoria:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al actualizar la categoria'
        });
    }
};

const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoriaEliminada = await Categoria.findByIdAndDelete(id);

        if (!categoriaEliminada) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrada'
            });
        }

        return res.json({
            ok: true,
            msg: 'Categoria eliminada correctamente'
        });


    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar la categoria'
        });
    }
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria
};
