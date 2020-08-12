const express = require('express');
const router = express.Router();
const HttpError = require('../../utils/HttpError');

router.use((req, res, next) => {
    req.floorsList = req.app.locals.databaseConnection.floorsList;

    next();
});

router.post('/', async (req, res) => {
    try{
        await req.floorsList.add(req.body);

        const result = await req.floorsList.get();

        req.app.locals.io.emit('floors:add', result);
        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return HttpError(e, res);
    }
});

module.exports = router;