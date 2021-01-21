import boom from '@hapi/boom';
import Joi from '@hapi/joi';

function validate(data: any, schema: any){
    const {error} = Joi.object(schema).validate(data);
    return error;
}

export default function validationHandler(schema: any, check: any = 'body'){
    return function(req: any, res: any, next: any){
        const error: any = validate(req[check], schema);

        error ? next(boom.badRequest(error)): next();
    };
}
