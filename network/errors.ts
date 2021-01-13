import {Request, Response} from 'express';
const response = require('./response');

export default function errors(err:any, req:Request, res:Response): void{
    console.error('[error]', err.statusMessage);

    const message: object | string = err.message || 'Internal error';
    const status: number = err.statusCode || response.statusDefault.error;

    response.error(req, res, message, status);
}

