import express, {Router, Request, Response, NextFunction} from 'express'
import {productServices} from '../../core/services';
import {Product, Role} from '../../core/models';
import { authorize, validationHandler, cpUpload, auth } from '../../utils/middlewares';
import { createProductSchema, productIdSchema, rateProductSchema } from '../../utils/schemes';

const router:Router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:productId/updateImage', cpUpload,updateImage);
router.delete('/:productId', deleteProduct);

router.post('/:productId/rate', auth, rate);
router.delete('/:idRating/unrate', auth, unrate);



function getProducts(req:Request, res:Response, next: NextFunction){
    productServices.getAllProduct().then((list: Array<Product> ) => {
        res.status(200).json({
            message: "products listed",
            data: list
        });
    }).catch((error: Error) => {
        next(error)
    });
}

function createProduct(req:Request, res:Response, next: NextFunction){
    const {idInventoryItems} = req.body
    productServices.addProduct(idInventoryItems).then(() => {
        res.status(201).json({
            message: 'Product added'
        })
    }).catch((error: Error) => {
        next(error);
    });
}

function updateImage(req:Request, res:Response, next: NextFunction){
    const {productId} = req.params;
    const { files } = req
    
    productServices.saveImage(productId, files).then((productId: string) => {
        res.status(200).json({
            message: 'Product updated',
            data: productId
        })
    }).catch((error: Error) => {
        next(error);
    });
}

function deleteProduct(req:Request, res:Response, next: NextFunction){
    const {productId} = req.params;
    productServices.removeProduct(productId).then((productIdDeleted: string) => {
        res.status(200).json({
            message: 'Product deleted',
            data: productIdDeleted
        })
    }).catch((error: Error) => {
        next(error);
    });
}

function rate(req:Request, res:Response, next: NextFunction){

    const data: object = {
        productId: req.params.productId,
        rate: req.body.rate,
        authorization: req.headers.authorization
    }
    productServices.rateProduct(data).then((productRated: string) => {
        res.status(200).json({
            message: 'Product rated',
            data: productRated
        })
    }).catch((error: Error) => {
        next(error);
    });
}

function unrate(req:Request, res:Response, next: NextFunction){
    const {idRating} = req.params;
    productServices.unRateProduct(idRating).then((ratingId: string) => {
        res.status(200).json({
            message: 'Product unrated',
            data: ratingId
        })
    }).catch((error: Error) => {
        next(error);
    });
}

export default router