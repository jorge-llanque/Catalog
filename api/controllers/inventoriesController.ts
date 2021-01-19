import express, {Router, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import {inventoryServices} from '../../core/services';
import { InventoryItem, RoleUser } from '../../core/models';
import {authorize} from '../../utils/middlewares/validateRole';
import { createInventorySchema, inventoryIdSchema, updateInventorySchema } from '../../utils/schemes/inventoriesSchema';
import validationHandler from '../../utils/middlewares/validationHandler';

const router:Router = express.Router();

//JWT STRATEGY
require("../../utils/auth/strategies/jwt");

let auth: any = passport.authenticate("jwt", {session: false})

router.get('/', auth, authorize([RoleUser.Writer, RoleUser.Admin, RoleUser.Customer]), getInventoryItems);
router.post('/', auth, authorize([RoleUser.Admin, RoleUser.Customer]), 
            validationHandler(createInventorySchema), 
            createItem);
router.put('/:id', auth, authorize([RoleUser.Admin, RoleUser.Writer, RoleUser.Customer]), 
            validationHandler({id: inventoryIdSchema}, 'params'),
            validationHandler(updateInventorySchema), 
            editItem);


function getInventoryItems(req:Request, res:Response, next: NextFunction){
    inventoryServices.getAllInventoryItems().then((list:object)=>{
        res.status(200).json({
            message: "movies listed",
            data: list
        });
    }).catch((err: any) => {
        next(err)
    });
}

function createItem(req:Request, res:Response, next: NextFunction){
    const {name, description} = req.body;
    inventoryServices.addItem(name, description).then((itemId: any) => {
        res.status(201).json({
            message: 'Item added',
            data: itemId
        });
    }).catch((err: any) => {
        next(err);
    });
}

function editItem(req:Request, res:Response, next: NextFunction){
    const {id} = req.params;
    inventoryServices.updateItem(id, req.body).then((itemId: any) => {
        res.status(200).json({
            message: 'Item updated',
            data: itemId
        })
    }).catch((err: any) => {
        next(err);
    });
}


export {router}