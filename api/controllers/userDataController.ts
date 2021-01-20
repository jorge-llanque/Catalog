import express, {Router, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import { User } from '../../core/models';
import { userServices } from '../../core/services';
import validationHandler from '../../utils/middlewares/validationHandler';
import { createUserSchema, updateUserSchema } from '../../utils/schemes/usersSchema';

const router:Router = express.Router();

// JWT STRATEGY
require('../../utils/auth/strategies/jwt');

let auth: any = passport.authenticate("jwt", {session: false})

router.get('/', auth, getUser);
router.put('/', auth, validationHandler(updateUserSchema), updateUser);
router.delete('/', auth, deleteUser);
router.post('/register', validationHandler(createUserSchema), registerUser);

function getUser(req:Request, res:Response, next: NextFunction){
    const {authorization: authorization} = req.headers
    userServices.getUserById(authorization).then((user: User) => {
        res.status(200).json({
            message: 'User obtained',
            data: user
        })
    }).catch( (error: any) => {
        next(error);
    });
}

function updateUser(req:Request, res:Response, next: NextFunction){
    const {authorization: authorization} = req.headers
    const valuesForUpdate: object = req.body;
    userServices.updateUser(authorization, valuesForUpdate).then((userId: string) => {
        res.status(200).json({
            message: 'User updated',
            data: userId
        })
    }).catch( (error: any) => {
        next(error);
    });
}

function deleteUser(req:Request, res:Response, next: NextFunction){
    const {authorization: authorization} = req.headers
    userServices.removeUser(authorization).then((userIdDeleted: string)=> {
        res.status(200).json({
            message: 'User deleted',
            data: userIdDeleted
        })
    }).catch((error: any) => {
        next(error);
    });
}

function registerUser(req:Request, res:Response, next: NextFunction){
    const {username, email, password} = req.body;
    userServices.addUser(username, email, password).then((userIdCreated: string) => {
            res.status(201).json({
                message: 'User created',
                data: userIdCreated
            })
    }).catch((error: any) => {
        next(error);
    });
}


export {router}