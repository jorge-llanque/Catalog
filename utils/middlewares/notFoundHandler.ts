import boom from '@hapi/boom';

function notFoundHandler(req: any, res: any){
    const { output: {statusCode, payload } } = boom.notFound();

    res.status(statusCode).json(payload);
}

export default notFoundHandler