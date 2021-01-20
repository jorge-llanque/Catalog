import express, {Router, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import {inventoryServices} from '../../core/services';
import { Role } from '../../core/models';
import {authorize} from '../../utils/middlewares/validateRole';
import { createInventorySchema, inventoryIdSchema, updateInventorySchema } from '../../utils/schemes/inventoriesSchema';
import validationHandler from '../../utils/middlewares/validationHandler';

const router:Router = express.Router();

//JWT STRATEGY
require("../../utils/auth/strategies/jwt");

let auth: any = passport.authenticate("jwt", {session: false})

router.get('/', auth, authorize([Role.Writer, Role.Admin, Role.Customer]), getInventoryItems);
router.post('/', auth, authorize([Role.Admin, Role.Customer]), 
            validationHandler(createInventorySchema), 
            createItem);
router.put('/:itemId', auth, authorize([Role.Admin, Role.Writer, Role.Customer]), 
            validationHandler({itemId: inventoryIdSchema}, 'params'),
            validationHandler(updateInventorySchema), 
            editItem);
router.delete('/:itemId', auth, authorize([Role.Writer, Role.Admin, Role.Customer]),
            validationHandler({itemId: inventoryIdSchema}, 'params'), deleteItem);


function getInventoryItems(req:Request, res:Response, next: NextFunction){
    inventoryServices.getAllInventoryItems().then((list: object)=>{
        res.status(200).json({
            message: "movies listed",
            data: list  
        });
    }).catch((error: any) => {
        next(error)
    });
}

function createItem(req:Request, res:Response, next: NextFunction){
    const {name, description} = req.body;
    inventoryServices.addItem(name, description).then((itemId: string) => {
        res.status(201).json({
            message: 'Item added',
            data: itemId
        });
    }).catch((error: any) => {
        next(error);
    });
}

function editItem(req:Request, res:Response, next: NextFunction){
    const {itemId} = req.params
    const valuesForUpdate: object = req.body
    inventoryServices.updateItem(itemId, valuesForUpdate).then((itemId: string) => {
        res.status(200).json({
            message: 'Item updated',
            data: itemId
        })
    }).catch((error: any) => {
        next(error);
    });
}

function deleteItem(req: Request, res: Response, next: NextFunction){
    const {itemId} = req.params;
    inventoryServices.removeItem(itemId).then((itemId: string) => {
        res.status(200).json({
            message: 'Item deleted',
            data: itemId
        })
    }).catch((error: any) => {
        next(error);
    })
}


export {router}