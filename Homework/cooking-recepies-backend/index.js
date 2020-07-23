'use strict'
import express from 'express';
import bodyParser from 'body-parser';
import { processUserRequest } from './routes/apiActions';
import adaptRequest from './helpers/adaptRequest';

const app = express()
app.use(bodyParser.json())

app.get('/user/:nickName', usersController);
app.all('/user', usersController);

function usersController(req, res) {
    const httpRequest = adaptRequest(req)
    processUserRequest(httpRequest)
        .then(({ headers, statusCode, data }) =>
            res
                .set(headers)
                .status(statusCode)
                .send(data)
        )
        .catch(e => res.status(500).end())
}

app.listen(9090, () => console.log(`Listening on port 9090`))