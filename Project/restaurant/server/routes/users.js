const express = require('express');
const router = express.Router();

const { HttpError } = require('../helpers');

router.post('/', async (req, res) => {
    try {
        const result = await req.app.locals.userList.add(req.body);

        if (!result.status) {
            req.io.emit('update:users', await req.app.locals.userList.get());
        } else {
            return res.status(403).send(result);
        }

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: 'Непредвидена грешка на съвара', status: 500, from: '/users/ POST' });
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await req.app.locals.userList.update(req.body);

        if (!result.status)
            req.io.emit('update:users', await req.app.locals.userList.get());

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: 'Непредвидена грешка на съвара', status: 500, from: '/users/ PUT' });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await req.app.locals.userList.get(req.query ? req.query : {});

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: 'Непредвидена грешка на съвара', status: 500, from: '/users/ GET' });
    }
});

router.get('/:username', async (req, res) => {
    try {
        const result = await req.app.locals.userList.getByUsername(req.params.username);
        
        if (!result) {
            return res.status(404).send({ message: 'Не съществува такъв потребител' });
        }

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: 'Непредвидена грешка на съвара', status: 500, from: '/users/ GET' });
    }
});

router.delete('/:username', async (req, res) => {
    try {
        const result = await req.app.locals.userList.deleteByUsername(req.params.username);

        req.io.emit('update:users', await req.app.locals.userList.get());

        res.send(result);
    } catch (e) {
        console.log(e.stack)
        return res.status(500).send({ message: 'Непредвидена грешка на съвара', status: 500, from: '/users/ GET' });
    }
});

module.exports = router;