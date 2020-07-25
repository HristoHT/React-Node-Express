const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await req.app.locals.turnoversList.get(req.query);

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: e.message });
    }
});

module.exports = router;