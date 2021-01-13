import express, {Router, Request, Response} from 'express';
/* import { success } from '../../../network/response'; */
const response = require('../../../network/response');
const Controller = require('./index');

const router:Router = express.Router();

router.post('/like', likeProduct);
router.post('/unlike', unLikeProduct);
router.post('/unrate', unrateProduct);

function likeProduct(req:Request, res:Response){
    Controller.rateProduct(req.body, 'like')
    .then((data:any) => {
        response.success(req, res, data, 200);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid information', 400, err)
    });
}

function unLikeProduct(req:Request, res:Response){
    Controller.rateProduct(req.body, 'unlike')
    .then((data:any) => {
        response.success(req, res, data, 200);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid information', 400, err)
    });
}

function unrateProduct(req:Request, res:Response){
    Controller.unRate(req.body)
    .then((data:any) => {
        response.success(req, res, data, 200);
    }).catch((err:any) => {
        response.error(req, res, 'Invalid information', 400, err)
    })
}

export default router;