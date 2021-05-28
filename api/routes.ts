import swaggerUi from 'swagger-ui-express';
import * as controller from './controllers';
import authApiRouter from './auth';


const swaggerDoc = require('../swagger.json');

function CatalogApi(server: any) {
    server.use('/api/user', controller.userController);
    server.use('/api/auth', authApiRouter);
    server.use('/api/inventories', controller.inventoryController);
    server.use('/api/products', controller.productController);
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

export default CatalogApi