import express, {Router, Request, Response} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../../config';

const router: Router = express.Router();

// BASIC STRATEGY
require('../../utils/auth/strategies/basic');

router.post('/token', token);

function token(req:Request, res:Response){
    passport.authenticate("basic", function(error, user) {
        try {
            if(error || !user){
                return ("hubo un error");
            }

            req.login(user, {session: false}, async function(error){
                if(error){
                    return error;
                }

                const payload = {sub: user.username, id: user.id, email: user.email, role: user.role};
                const token = jwt.sign(payload, config.jwt.secretkey, {
                    expiresIn: "1h"
                });
    
                return res.status(200).json({access_token: token});
            });
        } catch (error) {
            return error;            
        }
    })(req, res);
}

export default router
