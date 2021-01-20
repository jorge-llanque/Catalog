import express, {Router, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import { User, RoleUser } from '../../core/models';
import { userServices } from '../../core/services';
import validationHandler from '../../utils/middlewares/validationHandler';
import { userIdSchema, createUserSchema, updateUserSchema } from '../../utils/schemes/usersSchema';

const router:Router = express.Router();

// JWT STRATEGY
require('../../utils/auth/strategies/jwt');

let auth: any = passport.authenticate("jwt", {session: false})

router.get('/', auth, getUser);
router.put('/', auth, validationHandler(updateUserSchema), updateUser);
router.delete('/', auth, deleteUser);
router.post('/register', validationHandler(createUserSchema), registerUser);

function getUser(req:Request, res:Response, next: NextFunction){
    const authorization: any = req.headers.authorization
    userServices.getUserById(authorization).then((user: User) => {
            res.status(200).json({
                message: 'User obtained',
                data: user
            })
        }).catch( (err: any) => {
            next(err);
        });
}

function updateUser(req:Request, res:Response, next: NextFunction){
    const authorization: any = req.headers.authorization
    const body: object = req.body;
    userServices.updateUser(authorization, body).then((userId:User) => {
        res.status(200).json({
            message: 'User updated',
            data: userId
        })
    }).catch( (err: any) => {
        next(err);
    });
}

function deleteUser(req:Request, res:Response, next: NextFunction){
    const authorization: any = req.headers.authorization
    userServices.removeUser(authorization).then((userIdDeleted)=> {
        res.status(200).json({
            message: 'User deleted',
            data: userIdDeleted
        })
    }).catch((err: any) => {
        next(err);
    });
}

function registerUser(req:Request, res:Response, next: NextFunction){
    const {username, email, password} = req.body;
    userServices.addUser(username, email, password).then((userIdCreated: any) => {
            res.status(201).json({
                message: 'User created',
                data: userIdCreated
            })
    }).catch((err: any) => {
        next(err);
    });
}


export {router}