import express, {Router, Request, Response} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../../config';

const router: Router = express.Router();

// BASIC STRATEGY
require('../../utils/auth/strategies/basic');

router.post('/token', token);

function token(req:Request, res:Response, next: any){
    passport.authenticate("basic", function(error, user) {
        try {
            if(error || !user){
                return ("hubo un error");
            }

            req.login(user, {session: false}, async function(error){
                if(error){
                   next(error)
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
