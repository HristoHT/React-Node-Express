const express = require('express');
const router = express.Router();
const HttpError = require('../../utils/HttpError');

router.use((req, res, next) => {
    req.usersList = req.app.locals.globalConnection.usersList;

    next();
});


router.post('/', async (req, res) => {
    try {
        const result = await req.usersList.add(req.body);
       
        return res.send(result);
    } catch (e) {
       return HttpError(e, res);
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await req.usersList.update(req.body);
       
        return res.send(result);
    } catch (e) {
       return HttpError(e, res);
    }
});

module.exports = router;