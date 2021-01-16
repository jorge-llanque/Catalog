import express, {Router, Request, Response} from 'express';
import passport from 'passport';
import {inventoryServices} from '../../core/services';
import { InventoryItem } from '../../core/models';

const router:Router = express.Router();

//JWT STRATEGY
require("../../utils/auth/strategies/jwt");

let auth: any = passport.authenticate("jwt", {session: false})

router.get('/', auth, getInventoryItems);
router.post('/', auth, createItem);
router.put('/:id', auth, editItem);
router.delete('/:id', auth, deleteItem);

function getInventoryItems(req:Request, res:Response){
    inventoryServices.getAllInventoryItems().then((list:object)=>{
        res.status(200).send(list);
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}

function createItem(req:Request, res:Response){
    const {name, description} = req.body;
    inventoryServices.addItem(name, description).then((itemAdded:InventoryItem) => {
        res.status(201).send(itemAdded);
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}

function editItem(req:Request, res:Response){
    const {id} = req.params;
    inventoryServices.updateItem(id, req.body).then((item:InventoryItem) => {
        res.status(201).send(item)
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}

function deleteItem(req:Request, res:Response){
    const {id} = req.params;
    inventoryServices.removeItem(id).then(() => {
        res.status(200).send()
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}

export {router}