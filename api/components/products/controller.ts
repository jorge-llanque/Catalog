import { v4 as uuidv4 } from 'uuid';

const TABLA = "products";

module.exports = function(injectedStore:any){
    let store = injectedStore;

    function addProduct(body:any){
        const product = {
            id: uuidv4(),
            idInventoryItems: body.itemId,
            like:0,
            unlike:0
        }

        return store.insert(TABLA, product);
    }
    function list(){
        return store.listdata(TABLA);
    }

    function deleteProduct(id:string){
        return store.removeItem(TABLA, id)
    }
    

    return {
        addProduct,
        list,
        deleteProduct
    }
}