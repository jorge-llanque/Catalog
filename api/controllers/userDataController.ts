import express, {Router, Request, Response, NextFunction} from 'express';
import { User } from '../../core/models';
import { userServices } from '../../core/services';
import {validationHandler, auth } from '../../utils/middlewares';
import { createUserSchema, updateUserSchema } from '../../utils/schemes';

const router:Router = express.Router();

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
    }).catch( (error: Error) => {
        next(error);
    });
}

function updateUser(req:Request, res:Response, next: NextFunction){
    const {authorization: authorization} = req.headers;
    const { body }= req;
    userServices.updateUser(authorization, body).then((userId: string) => {
        res.status(200).json({
            message: 'User updated',
            data: userId
        })
    }).catch( (error: Error) => {
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
    }).catch((error: Error) => {
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
    }).catch((error: Error) => {
        next(error);
    });
}


export default router