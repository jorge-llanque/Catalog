import express, {Router, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../../config';
import boom from '@hapi/boom';

const router: Router = express.Router();

// BASIC STRATEGY
require('../../utils/auth/strategies/basic');

router.post('/token', token);

async function token(req:Request, res:Response, next: NextFunction){

    passport.authenticate("basic", function(error, user) {
        try {
            if(error || !user){
                next(boom.unauthorized());
            }

            req.login(user, {session: false}, async function(error){
                if(error){
                   next(error);
                }
                
                const payload = {sub: user.username, id: user.id, email: user.email, role: user.role};
                const token = jwt.sign(payload, config.jwt.secretkey, {
                    expiresIn: "7d"
                });
    
                return res.status(200).json({access_token: token});
            });          
        } catch(error: any) {
            next(error);        
        }
    })(req, res);

}

export default router
