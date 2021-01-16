import passport from 'passport';
import {BasicStrategy} from 'passport-http';
import bcrypt from 'bcrypt';
import { userServices } from '../../../core/services';

passport.use(
    new BasicStrategy(async function(username, password, cb){
        try {
            console.log(username, password, 'prueba');
            const [user]: any = await userServices.getUserByUsername(username);
            console.log(user, "en auth/strategies/basic");

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