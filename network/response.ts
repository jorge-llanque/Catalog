exports.success = function(req:any, res:any, message:String, status:Number){
    let statusCode = status || 200;
    let statusMessage = message || '';

    res.status(status).send({
        error: false,
        status:status,
        body:message
    });
}

exports.error = function(req:any, res:any, message:String, status:Number){
    let statusCode = status || 500;
    let statusMessage = message || 'Internal server error';

    res.status(statusCode).send({
        error: false,
        status: status,
        body: message
    });
}