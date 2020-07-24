const express = require('express');
const router = express.Router();

router.post('/:tableId', async (req, res) => {
    try {
        const result = await req.app.locals.tableList.updateBill(req.params.tableId, req.body);

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: e.message });
    }
});

router.delete('/:tableId', async (req, res) => {
    try {
        const result = await req.app.locals.tableList.stopBill(req.params.tableId);

        if (!result.status)
            req.io.emit('update:floor', await req.app.locals.floorList.getFloorById(result.floorId));

        res.send(result);
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: e.message });
    }
});

module.exports = router;