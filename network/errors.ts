const response = require('./response')

function errors(err:any, req:Request, res:Response){
    console.error('[error]', err);

    const message = err.message || 'Internal error';
    const status = err.statusCode || 500;

    response.error(req, res, message,status);
    
}
module.exports = errors;