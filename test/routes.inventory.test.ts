import assert from 'assert';
import proxyquire from 'proxyquire';
import { inventoryMock, InventoryServiceMock } from '../utils/mocks/inventory';
import testServer from '../utils/testServer';
/* import sd from '../api/controllers/inventoriesController' */

describe('routes - inventory', function(){
    console.log("aqui");
    const route = proxyquire('../api/controllers/inventoryController', {
        '../../core/services': InventoryServiceMock
    });

    const request = testServer(route);

    describe('GET /inventory', function(){

        it('should respond with status 200', function(done){
            
            request.get('/api/inventories').expect(200, done);
            
        });
    })

})