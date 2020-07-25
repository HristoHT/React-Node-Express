const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require("cors");
const { createListener } = require('./server/helpers');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const PORT = process.env.PORT || 8080;
const userList = require('./server/database/users/userList');
const menuList = require('./server/database/menus/menusList');
const tokenList = require('./server/database/auth/tokensList');
const floorList = require('./server/database/floors/floorsList');
const tableList = require('./server/database/tables/tablesList');
const turnoversList = require('./server/database/turnovers/turnoversList');
const uri = "mongodb+srv://ServizTestingUser:ServizTestingUserPassword@cluster0-poxvv.mongodb.net/test?retryWrites=true&w=majority";

/**
 * TODO ERROR HANDLING
 */

/**
 * Осъществява връзката с базата и след това пуска сървъра
 */
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async (client, err) => {
        if (err) console.log(err);
        try {
            client.db('Restaurant').collection('Menus').createIndex({ index: 1 }, { unique: true });
            client.db('Restaurant').collection('Menus').createIndex({ parent: 1 });
            client.db('Restaurant').collection('Users').createIndex({ username: 1 }, { unique: true });
            client.db('Restaurant').collection('Tokens').createIndex({ token: 1 }, { unique: true });

            app.locals.ObjectId = ObjectId;
            app.locals.userList = userList({ database: client.db('Restaurant'), ObjectId });
            app.locals.menuList = menuList({ database: client.db('Restaurant'), ObjectId });
            app.locals.tokenList = tokenList({ database: client.db('Restaurant'), ObjectId });
            app.locals.floorList = floorList({ database: client.db('Restaurant'), ObjectId });
            app.locals.tableList = tableList({ database: client.db('Restaurant'), ObjectId });
            app.locals.turnoversList = turnoversList({ database: client.db('Restaurant'), ObjectId });

            const usersLen = await app.locals.userList.length();
            if (usersLen === 0) {
                await app.locals.userList.add({
                    username: 'Admin',
                    firstName: 'Admin',
                    thirdName: 'Admin',
                    startDate: new Date(),
                    password: 'Admin',
                    job: 'Admin',
                    permissions: ['personnel']
                })
            }
            http.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
        } catch (e) {
            console.log(e.stack)
        }
    })


/**
 * Дава достъп на фронтенда до апито
 */
app.use(cors({
    origin: 'http://localhost:3000', // create-react-app dev server
}))

app.use(express.json({ limit: '50mb' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // extended = true is depricated
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', require('./server/api'));

app.use((err, req, res, next) => {
    return res.status(500).send(err.stack ? { error: err.stack } : err);
})

process.on('SIGINT', () => {
    app.locals.client.close();
    process.exit();
});