import { error } from "./response";

export function errors(err:any, req:Request, res:Response){
    console.error('[error]', err);

    const message = err.message || 'Internal error';
    const status = err.statusCode || 500;

    error(req, res, message,status);
}