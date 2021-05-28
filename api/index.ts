import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from '../config';
import CatalogApi from './routes';
import { createConnection } from 'typeorm';
import { logErrors, wrapErrors, errorHandler, notFoundHandler } from '../utils/middlewares';


const app = express();
app.use(cors());
app.use(morgan('combined'))
app.use(express.json());



CatalogApi(app);

// Catch 404
app.use(notFoundHandler);

// Error middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.api.port , ()=>{
    console.log('Api listening on port:', config.api.port);
})

// Create connection to DB
createConnection().then( connection => {
    console.log('DB CONNECTED')
}).catch( error => console.log(error) );

export default app