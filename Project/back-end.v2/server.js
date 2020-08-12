const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const cors = require("cors");
const databaseConnection = require('./database/connection');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

databaseConnection('Test').then(connection => {
    app.locals.io = io;
    app.locals.databaseConnection = connection;
    http.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
}).catch(err => {
    console.log(err.stack);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // extended = true is depricated

app.use('/api', require('./api/api.js'));

process.on('SIGINT', () => {
    app.locals.close();
    process.exit();
});