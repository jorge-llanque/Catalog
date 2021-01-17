import decode  = require('../auth/decodeHeader');

export function authorize(roles: string[]) {
    if(typeof roles === 'string'){
        roles = [roles];
    }

    console.log(roles, 'middlew/validateRole roles');
    return [(req: any, res: any, next: any)=> {
        const user: any | never = decode.decodeHeader(req.headers.authorization);
        const userRole: any = user.role;

        if(!roles.includes(userRole)) return res.status(403).send('You do not have role permission')
        next()
    }]
}

module.exports = {
    authorize
}