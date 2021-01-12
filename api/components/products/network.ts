import express, {Router, Request, Response} from 'express';
import { success } from '../../../network/response';
const response = require('../../../network/response');
const Controller = require('./index');

const router:Router = express.Router();

router.post('/', saveProduct);
router.get('/list', listProducts);
router.delete('/:id', deleteProduct);

function saveProduct(req:Request, res:Response){
    Controller.addProduct(req.body)
    .then((data:any) => {
        response.success(req, res, data, 201);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid information', 400, err)
    });
}

function listProducts(req:Request, res:Response){
    Controller.list()
    .then((data:any) => {
        response.success(req, res, data, 200);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid information', 400, err)
    });
}

function deleteProduct(req:Request, res:Response){
    Controller.deleteProduct(req.params.id)
    .then((data:any) => {
        response.success(req, res, data, 200);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid information', 400, err)
    });
}

export default router;