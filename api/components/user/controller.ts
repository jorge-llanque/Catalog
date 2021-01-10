const uuid = require('uuid');

const TABLA = 'user';

module.exports = function(injectedStore:any){
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy');
    }

    function list(){
        return store.listdata(TABLA);
    }

    function create(){
        return store.createUser(TABLA);
    }

    return {
        list,
        create
    }
}