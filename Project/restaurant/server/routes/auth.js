const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { HttpError } = require('../helpers');

/**
 * При правилно влизане в системата потребителят получава чифт ключове refreshToken & accessToken
 * AccessToken-a изтича на 10мин
 * RefreshToken-a се използва за възобновяване на AccessToken, пернаментен е или до изпълнение на DELETE request-a
 */
router.post('/login', async (req, res) => {
    try {
        let user = await req.app.locals.userList.getByUsername(req.body.username);
        if (user !== null) {
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

            if (isPasswordCorrect) {
                delete user.password;

                const accessToken = req.app.locals.tokenList.accessToken(user);
                const refreshToken = await req.app.locals.tokenList.refreshToken(user);

                res.send({ accessToken, refreshToken, user, status: 0 });
            } else {
                res.status(404).send({ message: 'Непаравилно име или парола', status: 3 })
            }
        } else {
            res.status(404).send({ message: 'Непаравилно име или парола', status: 2 })
        }

    } catch (e) {
        console.log(e.stack);
        res.status(500).send({ message: 'Непредвидена грешка на съвара', status: 1 });
    }
});

/**
 * По RefreshToken генерира нов AccessToken
 */
router.post('/token', async (req, res) => {
    try {
        const refreshToken = req.body.token;
        if (refreshToken == null) return res.status(401).send({ message: 'Влезте в профила си', status: 1 });

        //Проверява дали refreshToken-a съществува в базата с refreshToken-и,
        //ако не съществува => или клиентът се e logout-нал или е неправилен токен
        const isExistingToken = await req.app.locals.tokenList.getToken(refreshToken);
        if (isExistingToken === null) {
            return res.status(403).send({ message: 'Влезте в профила си', status: 2 });
        }

        try {
            //Връща нов accessToken ако refreshToken-a е валиден, а ако не хвърля грешка и попада в catch-a
            const accessToken = await req.app.locals.tokenList.verifyRefreshToken(refreshToken);

            res.send({ accessToken, status: 0 })
        } catch (e) {
            return res.status(403).send({ message: 'Влезте в профила си', status: 3, from: '/token' });
        }

    } catch (e) {
        console.log(e.stack);
        res.status(500).send({ message: 'Непредвидена грешка на съвара', status: 4 });
    }
});

/**
 * Деактивира refreshToken като го изтрива от базата
 */
router.delete('/logout', async (req, res) => {
    try {
        const refreshToken = req.body.token;
        if (!refreshToken) {
            return res.status(401).send({ message: 'Влезте в профила си', status: 1 });
        }

        await req.app.locals.tokenList.deleteToken(refreshToken);

        res.send({ status: 0 });
    } catch (e) {
        console.log(e.stack);
        res.status(500).send({ message: 'Непредвидена грешка на съвара', status: 4 });
    }
});

module.exports = router;