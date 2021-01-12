import express, {Router, Request, Response} from 'express';
import { success, error } from '../../../network/response';

const response = require('../../../network/response');
const Controller = require('./index');

const router:Router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/register', registerUser);
router.post('/login', loginUser);

/* Internal functions */
function list(req:Request, res:Response, next:any){
    Controller.list()
        .then((lista:any) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
}

function get(req:Request, res:Response, next:any){
    Controller.get(req.params.id)
        .then((user:any) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function registerUser(req:Request, res:Response){
    Controller.registerUser(req.body)
    .then((user:any) => {
            response.success(req, res, user, 201);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid information', 400, err)
    });
}

function loginUser(req:Request, res:Response){
    Controller.loginUser(req.body)
    .then((user:any) => {
        response.success(req, res, user, 200);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid information', 400, err)
    })
}

export default router;