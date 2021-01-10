import express from 'express';
import bodyParser from 'body-parser';
import morgan from "morgan";
import cors from "cors";

import config from '../config';
import {errors} from '../network/errors';
import user from './components/user/network';


const app = express();
app.use(cors());
app.use(morgan('combined'))
app.use(bodyParser.json());

app.use('/api/user', user);
/* app.use(errors); */


app.listen(config.api.port , ()=>{
    console.log('Api listening on port: ', config.api.port);
})
