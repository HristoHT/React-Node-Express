const express = require('express');
const router = express.Router();
const HttpError = require('../../utils/HttpError');

router.use((req, res, next) => {
    req.tablesList = req.app.locals.databaseConnection.tablesList;

    next();
});

router.post('/', async (req, res) => {
    try{
        const result = await req.tablesList.add(req.body);

        req.app.locals.io.emit('floors:add', result);
        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return HttpError(e, res);
    }
});

module.exports = router;