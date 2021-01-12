import express, {Router, Request, Response } from 'express';
import { success } from '../../../network/response';
const response = require('../../../network/response');
const Controller = require('./index');

const router:Router = express.Router();

router.post('/', createItem);
router.get('/list', listInventory);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

function createItem(req:Request, res:Response){
    Controller.create(req.body)
    .then((item:any) => {
        response.success(req, res, item, 201);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid information', 400, err)
    });
}

function listInventory(req:Request, res:Response){
    Controller.list()
    .then((list:any) => {
        response.success(req, res, list, 200);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid request', 400, err)
    })
}

function updateItem(req:Request, res:Response){
    Controller.update(req.params.id, req.body)
    .then((item:any) => {
        response.success(req, res, item, 200);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid information', 400, err)
    });
}

function deleteItem(req:Request, res:Response){
    Controller.deleteItem(req.params.id)
    .then((item:any) => {
        response.success(req, res, item, 200);
    }).catch((err:any) => {
        console.log(err)
        response.error(req, res, 'Invalid information', 400, err)
    });
}

export default router;