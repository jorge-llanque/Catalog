import express, {Router, Request, Response, NextFunction} from 'express';
import { inventoryServices } from '../../core/services';
import { InventoryItem, Role } from '../../core/models';
import { createInventorySchema, inventoryIdSchema, updateInventorySchema } from '../../utils/schemes';
import { auth, authorize, validationHandler } from '../../utils/middlewares';

const router: Router = express.Router();

router.get('/', getInventoryItems);
router.post('/', createItem);
router.put('/:itemId', editItem);
router.delete('/:itemId', deleteItem);


function getInventoryItems(req:Request, res:Response, next: NextFunction){
    inventoryServices.getAllInventoryItems().then((list: Array<InventoryItem>)=>{
        res.status(200).json({
            message: "Inventory listed",
            data: list
        });
    }).catch((error: Error) => {
        next(error)
    });
}

function createItem(req:Request, res:Response, next: NextFunction){
    const { name, description } = req.body;
    inventoryServices.addItem(name, description).then( () => {
        res.status(201).json({
            message: 'Item added'
        });
    }).catch((error: Error) => {
        next(error);
    });
}

function editItem(req:Request, res:Response, next: NextFunction){
    const { itemId } = req.params
    const { body } = req
    inventoryServices.updateItem(itemId, body).then(() => {
        res.status(200).json({
            message: 'Item updated'
        })
    }).catch((error: Error) => {
        next(error);
    });
}

function deleteItem(req: Request, res: Response, next: NextFunction){
    const {itemId} = req.params;
    inventoryServices.removeItem(itemId).then(() => {
        res.status(200).json({
            message: 'Item deleted'
        })
    }).catch((error: Error) => {
        next(error);
    })
}


export default router