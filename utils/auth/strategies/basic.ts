import passport from 'passport';
import {BasicStrategy} from 'passport-http';
import bcrypt from 'bcryptjs';
import { userServices } from '../../../core/services';
import boom from '@hapi/boom';


passport.use(
    new BasicStrategy(async function(username, password, cb){
        try {
            const [user]: any = await userServices.getUserByUsername(username)

            if(!user || user == undefined) {
                return cb(boom.unauthorized(), false)
            }
            if(!(await bcrypt.compareSync(password, user.password))){
                return cb(boom.unauthorized(), false)
            }
            
            return cb(null, user);

        } catch (error) {
            return cb(error)
        }
    })
);