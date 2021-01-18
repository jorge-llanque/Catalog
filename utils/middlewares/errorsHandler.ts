import boom from '@hapi/boom';
import config from '../../config';

function withErrorStack(error: any, stack: any){
    
    if(config.api.dev == undefined){
        return {...error, stack}
    }
    return error;
}

export function logErrors(err: any, req: any, res: any, next: any){
    console.log(err);
    next(err);
}

export function wrapErrors(err: any, req: any, res: any, next: any){
    if(!err.isBoom){
        next(boom.badImplementation(err));
    }

    next(err);
}

export function errorHandler(err: any, req: any, res: any, next: any){
    const { output: {statusCode, payload} } = err;

    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack));
}

export default {
    logErrors,
    wrapErrors,
    errorHandler
}
