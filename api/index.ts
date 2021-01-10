import express from 'express';
import bodyParser from 'body-parser';

const config = require('../config');
const errors = require('../network/errors');

const app = express();
app.use(bodyParser.json());

app.use(errors);

app.listen(config.api.port, ()=>{
    console.log('Api listening on port: ', config.api.port);
})
