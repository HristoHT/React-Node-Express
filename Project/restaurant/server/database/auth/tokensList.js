const config = require('../../config');
const jwt = require('jsonwebtoken');

const tokenList = ({ database }) => {
    const collection = database.collection('Tokens');

    const accessToken = user => {
        if(user.iat)delete user.iat;//Оказа се, че ако обектът има property iat генерира същич токен
        
        return jwt.sign(user, config.ACCESS_TOKEN, { expiresIn: '10s' });
    }
    
    const refreshToken = async user => {
        try {
            if(user.iat)delete user.iat;//Оказа се, че ако обектът има property iat генерира същич токен
            
            const token = jwt.sign(user, config.REFRESH_TOKEN);

            await collection.insertOne({ token });

            return token;
        } catch (e) {
            throw e;
        }
    }

    const deleteToken = async token => {
        try {
            return await collection.deleteOne({ token });
        } catch (e) {
            throw e;
        }
    }

    const getToken = async token => {
        try {
            return await collection.findOne({ token });
        } catch (e) {
            throw e;
        }
    }

    const verifyRefreshToken = async refreshToken => {
        try {
            const user = await jwt.verify(refreshToken, config.REFRESH_TOKEN);
            console.log(user);
            return accessToken(user);

        } catch (e) {
            throw e;
        }
    }

    const verifyAccessToken = async accessToken => {
        try {
            const user = await jwt.verify(accessToken, config.ACCESS_TOKEN);
            console.log(user);
            return user;

        } catch (e) {
            throw e;
        }
    }

    return {
        accessToken,
        refreshToken,
        deleteToken,
        getToken,
        verifyRefreshToken,
        verifyAccessToken
    }
}

module.exports = tokenList;