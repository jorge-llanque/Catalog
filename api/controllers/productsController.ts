import express, {Router, Request, Response} from 'express'
import {productServices} from '../../core/services';
import {Product} from '../../core/models';

const router:Router = express.Router();

router.get('/list', getProducts);
router.post('/', createProduct);
router.put('/:id/updateImage', updateImage);
router.delete('/:id', deleteProduct);
router.post('/:id/like', like);
router.post('/:id/unlike', unlike);
router.delete('/:idRating/unrate', unrate);

function getProducts(req:Request, res:Response){
    productServices.getAllProduct().then((list:object) => {
        res.status(200).send(list);
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}

function createProduct(req:Request, res:Response){
    const {idInventoryItems} = req.body
    productServices.addProduct(idInventoryItems).then((productAdded: Product) => {
        res.status(201).send(productAdded);
    }).catch((err: any) => {
        res.status(400).json({error: err.message})
    });
}

function updateImage(req:Request, res:Response){
    const {id} = req.params;
    productServices.saveImage(id).then(() => {
        res.status(200).send();
    }).catch((err:any) => {
        console.log(err)
        res.status(400).json({error: err.message})
    });
}

function deleteProduct(req:Request, res:Response){
    const {id} = req.params;
    productServices.removeProduct(id).then(() => {
        res.status(200).send()
    }).catch((err: any) => {
        res.status(400).json({error: err.message})
    });
}

function like(req:Request, res:Response){
    const {id} = req.params;
    const data = req.body;
    productServices.rateProduct(id, 'like', data).then(() => {
        res.status(204).send()
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}
function unlike(req:Request, res:Response){
    const {id} = req.params;
    const data = req.body;
    productServices.rateProduct(id, 'unlike', data).then(() => {
        res.status(204).send()
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}
function unrate(req:Request, res:Response){
    const {idRating} = req.params;
    const {productId} = req.body;
    productServices.unRateProduct(idRating, productId).then(() => {
        res.status(204).send()
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}

export {router}