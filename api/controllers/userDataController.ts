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

router.get('/:id', auth, validationHandler({id: userIdSchema}, 'params'), getUser);
router.put('/:id', auth, 
            validationHandler({id: userIdSchema}, 'params'),
             validationHandler(updateUserSchema), updateUser);
router.delete('/:id', auth, validationHandler({id: userIdSchema}, 'params'), deleteUser);
router.post('/register', validationHandler(createUserSchema), registerUser);

function getUser(req:Request, res:Response, next: NextFunction){
    const {id} = req.params;
    userServices.getUserById(id).then((user: User) => {
            res.status(200).json({
                message: 'User obtained',
                data: user
            })
        }).catch( (err: any) => {
            next(err);
        });
}

function updateUser(req:Request, res:Response, next: NextFunction){
    const {id} = req.params;
    const body: object = req.body;
    userServices.updateUser(id, body).then((userId:User) => {
        res.status(200).json({
            message: 'User updated',
            data: userId
        })
    }).catch( (err: any) => {
        next(err);
    });
}

function deleteUser(req:Request, res:Response, next: NextFunction){
    const {id} = req.params;
    userServices.removeUser(id).then((userIdDeleted)=> {
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