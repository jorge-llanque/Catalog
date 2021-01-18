import passport from 'passport';
import {BasicStrategy} from 'passport-http';
import bcrypt from 'bcrypt';
import { userServices } from '../../../core/services';

passport.use(
    new BasicStrategy(async function(username, password, cb){
        try {
            const [user]: any = await userServices.getUserByUsername(username);

            if(!user) {
                return cb("unauthorized", false)
            }

            if(!(await bcrypt.compare(password, user.password))){
                return cb("unauthorized", false)
            }

            return cb(null, user);

        } catch (error) {
            return cb(error)
        }
    })
);