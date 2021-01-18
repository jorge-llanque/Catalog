import {userController, inventoryController, productController} from './controllers';
import authApiRouter from './auth';
import swaggerUi from 'swagger-ui-express';

const swaggerDoc = require('../swagger.json');

export default function(server:any){
    server.use('/api/user', userController);
    server.use('/api/auth', authApiRouter);
    server.use('/api/inventories', inventoryController);
    server.use('/api/products', productController);
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}