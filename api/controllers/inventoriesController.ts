import express, {Router, Request, Response, NextFunction} from 'express';
import { inventoryServices } from '../../core/services';
import { Role } from '../../core/models';
import { createInventorySchema, inventoryIdSchema, updateInventorySchema } from '../../utils/schemes';
import { auth, authorize, validationHandler } from '../../utils/middlewares';

const router: Router = express.Router();

router.get('/', getInventoryItems);
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
    inventoryServices.getAllInventoryItems().then((list: any)=>{
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
    inventoryServices.addItem(name, description).then((itemId: string) => {
        res.status(201).json({
            message: 'Item added',
            data: itemId
        });
    }).catch((error: Error) => {
        next(error);
    });
}

function editItem(req:Request, res:Response, next: NextFunction){
    const { itemId } = req.params
    const { body } = req
    inventoryServices.updateItem(itemId, body).then((itemId: string) => {
        res.status(200).json({
            message: 'Item updated',
            data: itemId
        })
    }).catch((error: Error) => {
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
    }).catch((error: Error) => {
        next(error);
    })
}


export default router