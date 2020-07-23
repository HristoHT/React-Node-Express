const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.status(401).send({ message: 'Влезте в профила си', status: 1 });

        try {
            const user = await req.app.locals.tokenList.verifyAccessToken(token);

            req.user = user;
            next();
        } catch (e) {
            console.log(e.stack)
            return res.status(403).send({ message: 'Влезте в профила си', status: 3 });
        }
    } catch (e) {
        console.log(e.stack);
        return res.status(500).send({ message: 'Непредвидена грешка на съвара', status: 4 });
    }
}

module.exports = validateToken;