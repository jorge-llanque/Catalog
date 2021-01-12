import express from 'express';
import bodyParser from 'body-parser';
import morgan from "morgan";
import cors from "cors";
const swaggerUi = require('swagger-ui-express');

import config from '../config';
import {errors} from '../network/errors';
import user from './components/user/network';
import inventory from './components/inventory/network';
import products from './components/products/network';
import rateproduct from './components/rateproduct/network';

const app = express();
app.use(cors());
app.use(morgan('combined'))
app.use(bodyParser.json());

const swaggerDoc = require('../swagger.json');


/* ROUTES */
app.use('/api/user', user);
app.use('/api/inventory', inventory);
app.use('/api/products', products);
app.use('/api/rateproduct', rateproduct);
/* app.use(errors); */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(config.api.port , ()=>{
    console.log('Api listening on port: ', config.api.port);
})
