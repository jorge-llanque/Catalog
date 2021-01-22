import assert from 'assert';
import proxyquire from 'proxyquire';
import { inventoryServiceMock } from '../utils/mocks';
import testServer from '../utils/testServer';
/* import sd from '../api/controllers/inventoriesController' */

describe('routes - inventory', function(){
  
    const route: any = proxyquire('../api/routes', {
        '../core/services': inventoryServiceMock
    });

    console.log(route);

    const request: any = testServer(route);

    describe('GET /inventory', function(){

        it('should respond with status 200', function(done){
            
            request.get('/api/inventories').expect(200, done);
            
        });
    })



})