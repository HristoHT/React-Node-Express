const express = require('express');
const router = express.Router();

const { HttpError } = require('../helpers');

router.post('/', async (req, res) => {
    try {
        const result = await req.app.locals.menuList.add(req.body);

        if (!result.status)
            req.io.emit('add:menu', result.data);

        res.send(result);
    } catch (e) {
        console.log(e.stack)
        return res.status(500).send(e.message);
        throw e.stack;
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await req.app.locals.menuList.update(req.body);

        if (!result.status)
            req.io.emit('add:menu', result.data);

        res.send(result);
    } catch (e) {
        throw e.stack;
    }
});

router.delete('/:path', async (req, res) => {
    try {
        const result = await req.app.locals.menuList.delete(req.params.path);

        if (!result.status)
            req.io.emit('add:menu', result.data);

        res.send(result);
    } catch (e) {
        throw e.stack;
    }
});

router.get('/', async (req, res) => {
    const result = await req.app.locals.menuList.get(req.query.query);
    res.send(result);
});

module.exports = router;