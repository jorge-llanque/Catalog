import express, {Router, Request, Response} from 'express';
import { success } from '../../../network/response';

const response = require('../../../network/response');
const Controller = require('./index');

const router:Router = express.Router();

router.get('/', list);
router.post('/', createUser);

/* Internal functions */
function list(req:Request, res:Response, next:any){
    Controller.list()
        .then((lista:any) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
}

function createUser(req:Request, res:Response, next:any){
    Controller.create()
        .then((lista:any) => {
            response.success(req, res, lista, 201);
        })
        .catch(next);
}

export default router;