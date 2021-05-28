import express, {Router, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import boom from '@hapi/boom';
import config from '../../config';
// BASIC STRATEGY PASSPORT
import '../../utils/auth/strategies/basic';

const router: Router = express.Router();

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
        } catch(error) {
            next(error);        
        }
    })(req, res);

}

export default router
