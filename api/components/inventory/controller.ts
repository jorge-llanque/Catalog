import { v4 as uuidv4 } from 'uuid';

const TABLA = "inventory";

module.exports = function(injectedStore:any){
    let store = injectedStore;

    async function create(body:any){
        const item = {
            id: uuidv4(),
            name: body.name,
            description: body.description
        }

        return store.insert(TABLA, item);
    }

    function list(){
        return store.listdata(TABLA);
    }

    async function update(id:string, body:any){
        const item = {
            id: id,
            name: body.name,
            description: body.description
        }

        return store.update(TABLA, item);
    }

    async function deleteItem(id:string){
        return store.removeItem(TABLA, id)
        
    }

    return {
        create,
        list,
        update,
        deleteItem
    }
}