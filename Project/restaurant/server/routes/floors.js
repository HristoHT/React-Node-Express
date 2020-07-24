const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const result = await req.app.locals.floorList.addFloor(req.body);

        if (!result.status)
            req.io.emit('add:floor', await req.app.locals.floorList.get());

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: e.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await req.app.locals.floorList.addTable(req.params.id, req.body);

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: e.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await req.app.locals.floorList.updateFloor(req.body);

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: e.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await req.app.locals.floorList.get(req.query.query);

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: e.message });
    }
});

router.get('/:floorId', async (req, res) => {
    try {
        const result = await req.app.locals.floorList.getFloorById(req.params.floorId);

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: e.message });
    }
});

module.exports = router;