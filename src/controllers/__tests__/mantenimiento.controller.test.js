const Mantenimiento = require('../../models/mantenimiento.model');
const controller = require('../mantenimiento.controller');

jest.mock('../../models/mantenimiento.model');

describe('Mantenimiento Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    test('crearMantenimiento - success', async () => {
        const saved = { _id: '1', name: 'test' };
        // mock constructor to set save
        Mantenimiento.mockImplementation(function (data) {
            this.save = jest.fn().mockResolvedValue(saved);
        });

        req.body = { descripcion: 'desc' };

        await controller.crearMantenimiento(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ ok: true, data: saved }));
    });

    test('crearMantenimiento - failure returns 500', async () => {
        Mantenimiento.mockImplementation(function () {
            this.save = jest.fn().mockRejectedValue(new Error('db error'));
        });

        req.body = { descripcion: 'desc' };

        await controller.crearMantenimiento(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ ok: false }));
    });

    test('obtenerMantenimientos - success', async () => {
        const findMock = jest.fn().mockReturnValue({ sort: jest.fn().mockReturnValue({ populate: jest.fn().mockResolvedValue([{ _id: '1' }]) }) });
        Mantenimiento.find = findMock;

        await controller.obtenerMantenimientos(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ ok: true, data: expect.any(Array) }));
    });

    test('obtenerMantenimientoPorId - not found', async () => {
        const findByIdMock = jest.fn().mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });
        Mantenimiento.findById = findByIdMock;

        req.params = { id: 'nope' };

        await controller.obtenerMantenimientoPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ ok: false }));
    });

    test('obtenerMantenimientoPorId - success', async () => {
        const doc = { _id: '1' };
        const findByIdMock = jest.fn().mockReturnValue({ populate: jest.fn().mockResolvedValue(doc) });
        Mantenimiento.findById = findByIdMock;

        req.params = { id: '1' };

        await controller.obtenerMantenimientoPorId(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ ok: true, data: doc }));
    });

    test('actualizarMantenimiento - not found', async () => {
        const findByIdAndUpdateMock = jest.fn().mockResolvedValue(null);
        Mantenimiento.findByIdAndUpdate = findByIdAndUpdateMock;

        req.params = { id: 'x' };
        req.body = { descripcion: 'x' };

        await controller.actualizarMantenimiento(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('actualizarMantenimiento - success', async () => {
        const updated = { _id: '1', descripcion: 'x' };
        const findByIdAndUpdateMock = jest.fn().mockResolvedValue(updated);
        Mantenimiento.findByIdAndUpdate = findByIdAndUpdateMock;

        req.params = { id: '1' };
        req.body = { descripcion: 'x' };

        await controller.actualizarMantenimiento(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ ok: true, data: updated }));
    });

    test('eliminarMantenimiento - not found', async () => {
        const findByIdAndDeleteMock = jest.fn().mockResolvedValue(null);
        Mantenimiento.findByIdAndDelete = findByIdAndDeleteMock;

        req.params = { id: 'x' };

        await controller.eliminarMantenimiento(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('eliminarMantenimiento - success', async () => {
        const removed = { _id: '1' };
        const findByIdAndDeleteMock = jest.fn().mockResolvedValue(removed);
        Mantenimiento.findByIdAndDelete = findByIdAndDeleteMock;

        req.params = { id: '1' };

        await controller.eliminarMantenimiento(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ ok: true, data: removed }));
    });
});
