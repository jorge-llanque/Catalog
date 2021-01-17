import express, {Router, Request, Response} from 'express';
import passport from 'passport';
import {inventoryServices} from '../../core/services';
import { InventoryItem, RoleUser } from '../../core/models';
import {authorize} from '../../utils/middlewares/validateRole';


const router:Router = express.Router();

//JWT STRATEGY
require("../../utils/auth/strategies/jwt");

let auth: any = passport.authenticate("jwt", {session: false})

router.get('/', auth, authorize([RoleUser.Writer, RoleUser.Admin]), getInventoryItems);
router.post('/', auth, authorize([RoleUser.Admin]),createItem);
router.put('/:id', auth, authorize([RoleUser.Admin]),editItem);


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


export {router}