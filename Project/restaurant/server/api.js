const express = require('express');
const router = express.Router();
const validateToken = require('./middlewares/validateToken');

//TODO Във рaутовете, където викам 500 със непредвидена грешка в сървъра да го заменя с e.message
router.use('/users', validateToken, require('./routes/users'));
router.use('/menus', validateToken, require('./routes/menus'));
router.use('/floors', validateToken, require('./routes/floors'));
router.use('/tables', validateToken, require('./routes/tables'));
router.use('/auth', require('./routes/auth'));

// router.get('/isValid', validateToken, (req, res) => {
//     res.send(req.user);
// });

module.exports = router;