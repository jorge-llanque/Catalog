import express, {Router, Request, Response, NextFunction} from 'express'
import passport from 'passport';
import {productServices} from '../../core/services';
import {Product, Role} from '../../core/models';
import { authorize } from '../../utils/middlewares/validateRole';
import validationHandler from '../../utils/middlewares/validationHandler';
import { createProductSchema, productIdSchema } from '../../utils/schemes/productsSchema';
import cpUpload from '../../utils/middlewares/uploadFiles';

const router:Router = express.Router();

// JWT STRATEGY
require('../../utils/auth/strategies/jwt');

let auth: any = passport.authenticate("jwt", {session: false})

router.get('/', auth, getProducts);
router.post('/', auth, authorize([Role.Writer, Role.Admin, Role.Customer]),
            validationHandler(createProductSchema), createProduct);
router.put('/:productId/updateImage', auth, authorize([Role.Writer, Role.Admin, Role.Customer]),
            validationHandler({productId: productIdSchema}, 'params'), cpUpload,updateImage);
router.delete('/:productId', auth, authorize([Role.Writer, Role.Admin, Role.Customer]),
            validationHandler({productId: productIdSchema}, 'params'), deleteProduct);
router.post('/:productId/like', auth, authorize([Role.Customer, Role.Writer, Role.Admin]),
            validationHandler({productId: productIdSchema}, 'params'), like);
router.post('/:productId/unlike', auth, authorize([Role.Customer, Role.Writer, Role.Admin]), 
            validationHandler({productId:productIdSchema}, 'params'), unlike);
router.delete('/:idRating/unrate', auth, authorize([Role.Customer, Role.Writer, Role.Admin]), 
            validationHandler({idRating:productIdSchema}, 'params'), unrate);



function getProducts(req:Request, res:Response, next: NextFunction){
    productServices.getAllProduct().then((list: Product[]) => {
        res.status(200).json({
            message: "products listed",
            data: list
        });
    }).catch((error: any) => {
        next(error)
    });
}

function createProduct(req:Request, res:Response, next: NextFunction){
    const {idInventoryItems} = req.body
    productServices.addProduct(idInventoryItems).then((productId: string) => {
        res.status(201).json({
            message: 'Product added',
            data: productId
        })
    }).catch((error: any) => {
        next(error);
    });
}

function updateImage(req:Request, res:Response, next: NextFunction){
    const {productId} = req.params;
    const image = req.files;
    
    productServices.saveImage(productId, image).then((productId: string) => {
        res.status(200).json({
            message: 'Product updated',
            data: productId
        })
    }).catch((error: any) => {
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
    }).catch((error: any) => {
        next(error);
    });
}

function like(req:Request, res:Response, next: NextFunction){
    const productId: string = req.params.productId;
    const authorization: string | undefined = req.headers.authorization;
    const ratingId: string | undefined = req.body.ratingId;
    const rate: string = 'like';

    const data: object = {
        productId,
        authorization,
        ratingId,
        rate
    }
    productServices.rateProduct(data).then((productRated: string) => {
        res.status(200).json({
            message: 'Product rated',
            data: productRated
        })
    }).catch((error: any) => {
        next(error);
    });
}
function unlike(req:Request, res:Response, next: NextFunction){

    const productId: string = req.params.productId;
    const authorization: string | undefined = req.headers.authorization;
    const ratingId: string | undefined = req.body.ratingId;
    const rate: string = 'unlike';

    const data: object = {
        productId,
        authorization,
        ratingId,
        rate
    }
    productServices.rateProduct(data).then((productRated: string) => {
        res.status(200).json({
            message: 'Product rated',
            data: productRated
        })
    }).catch((error: any) => {
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
    }).catch((error: any) => {
        next(error);
    });
}

export {router}