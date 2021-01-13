import {userController} from '../api/controllers';
import inventory from '../api/components/inventory/network';
import products from '../api/components/products/network';
import rateproduct from '../api/components/rateproduct/network';
import swaggerUi from 'swagger-ui-express';

const swaggerDoc = require('../swagger.json');

export default function(server:any){
    server.use('/api/user', userController);
    server.use('/api/inventory', inventory);
    server.use('/api/products', products);
    server.use('/api/rateproduct', rateproduct);
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}