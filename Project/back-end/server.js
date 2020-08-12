const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const PORT = process.env.PORT || 8080;
const uri = process.env.DATABASE;
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
            app.locals.ObjectId = ObjectId;
            app.locals.globalConnection = require('./database-connection/global-connection').globalConnection(client.db('Restaurant'), ObjectId)
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

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', require('./api/api'));

app.use((err, req, res, next) => {
    return res.status(500).send(err.stack ? { error: err.stack } : err);
})

process.on('SIGINT', () => {
    app.locals.client.close();
    process.exit();
});