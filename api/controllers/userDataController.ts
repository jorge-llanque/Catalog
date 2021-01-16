import express, {Router, Request, Response} from 'express';
/* const response = require('../../network/response'); */
import { User } from '../../core/models';
import { userServices } from '../../core/services';

const router:Router = express.Router();

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

function getUser(req:Request, res:Response){
    const {id} = req.params;
    userServices.getUserById(id).then((user: User) => {
            res.status(201).send(user)
        }).catch( (err:any) => {
            res.status(400).json({error: err.message })
        });
}

function updateUser(req:Request, res:Response){
    const {id} = req.params;
    const body: object = req.body;
    userServices.updateUser(id, body).then((user:User) => {
        res.status(204).send(user)
    }).catch( (err:any) => {
        res.status(400).json({error: err.message })
    });
}

function deleteUser(req:Request, res:Response){
    const {id} = req.params;
    userServices.removeUser(id).then(()=> {
        res.status(200).send()
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}

function registerUser(req:Request, res:Response){
    const {username, email, password} = req.body;
    userServices.addUser(username, email, password).then((userCreated:User) => {
            res.status(201).send(userCreated)
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}

function loginUser(req:Request, res:Response){
    const {username, password} = req.body;
    userServices.authenticate(username, password).then(() => {
        res.status(200).send()
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}

function logoutUser(req:Request, res:Response){
    userServices.logout().then(() => {
        res.status(200).send()
    }).catch((err: any) => {
        res.status(400).json({error: err.message})
    })
}

export {router}