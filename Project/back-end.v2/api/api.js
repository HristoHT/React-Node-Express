const express = require('express');
const router = express.Router();

router.use('/floors', require('./routes/floors'));
router.use('/tables', require('./routes/tables'));

module.exports = router;