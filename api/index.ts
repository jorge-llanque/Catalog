import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import config from '../config';
import router from './routes';
import { logErrors, wrapErrors, errorHandler } from '../utils/middlewares/errorsHandler';
import notFoundHandler from '../utils/middlewares/notFoundHandler';


const app = express();
app.use(cors());
app.use(morgan('combined'))
app.use(bodyParser.json());
router(app);

// Catch 404
app.use(notFoundHandler);

// Error middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.api.port , ()=>{
    console.log('Api listening on port:', config.api.port);
})
