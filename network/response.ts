import {Request, Response} from 'express';

export enum statusDefault {
    "success" = 200,
    "error" = 500
}

exports.success = function(req:any, res:any, message:any, status:number):void{
    let statusCode:number = status || statusDefault.success;
    let statusMessage:object = message || '';

    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: statusMessage
    });
}

exports.error = function(req:any, res:any, message:any, status:number, details?:string){
    let statusCode:number = status || statusDefault.error;
    let statusMessage:object | string = message || 'Internal server error';

    res.status(500).send({
        error: '',
        status: 500,
        body: 'Internal server error'
    });
}