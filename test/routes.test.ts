import assert from 'assert';
import proxyquire from 'proxyquire';
import { inventoryServiceMock } from '../utils/mocks';
import testServer from '../utils/testServer';

describe('routes - inventory', function(){

  const { default: route } = proxyquire('../api/routes', {
      '../core/services': {inventoryServiceMock}
  });

  
  const request = testServer(route);
  
  describe('GET /inventories', function() {
      
    it('should respond with status 200', function(done) {
        request.get('/api/inventories/').expect(200, done);
    });


    it('should respond with the list of inventory', function(done){
        request.get('/api/inventories/').end((err, res) => {
          assert.deepEqual(res.body, {
            message: 'Inventory listed',
            data: inventoryServiceMock.inventoryMock
          });

          done();

        });
      });
    });


});
