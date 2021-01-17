import express, {Router, Request, Response} from 'express'
import passport from 'passport';
import {productServices} from '../../core/services';
import {Product, RoleUser} from '../../core/models';
import { authorize } from '../../utils/middlewares/validateRole';

const router:Router = express.Router();

// JWT STRATEGY
require('../../utils/auth/strategies/jwt');

let auth: any = passport.authenticate("jwt", {session: false})

router.get('/', getProducts);
router.post('/', auth, authorize([RoleUser.Writer, RoleUser.Admin]), createProduct);
router.put('/:id/updateImage', authorize([RoleUser.Writer, RoleUser.Admin]), auth, updateImage);
router.delete('/:id', auth, authorize([RoleUser.Writer, RoleUser.Admin]), deleteProduct);
router.post('/:id/like', auth, authorize([RoleUser.Customer, RoleUser.Writer, RoleUser.Admin]), like);
router.post('/:id/unlike', auth, authorize([RoleUser.Customer, RoleUser.Writer, RoleUser.Admin]), unlike);
router.delete('/:idRating/unrate', auth, authorize([RoleUser.Customer, RoleUser.Writer, RoleUser.Admin]), unrate);



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
    const id: string = req.params.id;
    const authorization: string | undefined = req.headers.authorization;
    const ratingId: string | undefined = req.body.ratingId;
    const rate: string = 'like';

    const data: object = {
        id,
        authorization,
        ratingId,
        rate
    }
    productServices.rateProduct(data).then(() => {
        res.status(204).send()
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}
function unlike(req:Request, res:Response){

    const id: string = req.params.id;
    const authorization: string | undefined = req.headers.authorization;
    const ratingId: string | undefined = req.body.ratingId;
    const rate: string = 'unlike';

    const data: object = {
        id,
        authorization,
        ratingId,
        rate
    }
    productServices.rateProduct(data).then(() => {
        res.status(204).send()
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}
function unrate(req:Request, res:Response){
    const {idRating} = req.params;
    const authorization: string | undefined = req.headers.authorization;
    const data: object = {authorization}
    productServices.unRateProduct(idRating, data).then(() => {
        res.status(204).send()
    }).catch((err:any) => {
        res.status(400).json({error: err.message})
    });
}

export {router}