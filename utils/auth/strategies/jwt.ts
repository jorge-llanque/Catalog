import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import config from '../../../config';
import { userServices } from '../../../core/services';

passport.use(
    new Strategy(
        {
            secretOrKey: config.jwt.secretkey,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async function(tokenPayload, cb){
            try {
                const user: any = await userServices.getUserByUsername(tokenPayload.sub);
                
                if(!user){
                    return cb("unauthorizated", false);
                }

                return cb(null, user);

            } catch (error) {
                return cb(error);
            }
        }
    )
)