import {v4 as uuidv4} from 'uuid';

const TABLA = 'user';
export type User = {
    id: string;
    fullname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

module.exports = function(injectedStore:any){
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy');
    }

    function list(){
        return store.listdata(TABLA);
    }

    function get(id:string){
        return store.get(TABLA, id);
    }

    async function registerUser(body:any){
        const user = {
            id: uuidv4(),
            username: body.username,
            fullname: body.fullname,
            lastname: body.lastname,
            password: body.password,
            email: body.email
        }
        return store.insert(TABLA, user);
    }

    async function loginUser(body:any){
        if(store.getByUsername(body.username)){
                return 'Login successful'
            
        }else{
            return false
        }
        
    }

    return {
        list,
        get,
        registerUser,
        loginUser
    }
}