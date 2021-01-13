import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import config from '../config';
import router from '../network/routes';
import errors from '../network/errors';

const app = express();
app.use(cors());
app.use(morgan('combined'))
app.use(bodyParser.json());
router(app);
app.use(errors);

app.listen(config.api.port , ()=>{
    console.log('Api listening on port:', config.api.port);
})
