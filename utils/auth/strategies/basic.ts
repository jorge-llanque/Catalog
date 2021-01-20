import passport from 'passport';
import {BasicStrategy} from 'passport-http';
import bcrypt from 'bcryptjs';
import { userServices } from '../../../core/services';
import boom from '@hapi/boom';


passport.use(
    new BasicStrategy(async function(username, password, cb){
        try {
            const [user]: any = await userServices.getUserByUsername(username)

            console.log(username, password, 'username and pass')
            console.log(user, '/basic/user')
            if(!user || user == undefined) {
                console.log('entró al if');
                return cb(boom.unauthorized(), false)
            }

            if(!(await bcrypt.compareSync(password, user.password))){
                return cb("unauthorized", false)
            }

            return cb(null, user);

        } catch (error) {
            console.log('entró al error');
            console.log(error, 'desde error');
            return cb(error)
        }
    })
);