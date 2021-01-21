import { NextFunction, Request, Response } from 'express';
import decode from '../auth/decodeHeader';

export default function authorize(roles: string[]) {
    if(typeof roles === 'string'){
        roles = [roles];
    }

    return [(req: Request, res: Response, next: NextFunction)=> {
        const user: any = decode(req.headers.authorization);
        const userRole: any = user.role;

        if(!roles.includes(userRole)) return res.status(403).send('You do not have role permission')
        next()
    }]
}