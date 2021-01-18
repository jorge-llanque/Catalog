import { User, createUser, updatePassword } from '../models';
import repository = require('../../store/mysql');

const table: string = 'user';

export function getUserById(id: string): Promise<User>{
    try {
        return repository.getDataById(table, id);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function getUserByUsername(name: string): Promise<any>{
    try {
        return repository.getDataByUsername(table, name);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function updateUser(id:string, body: any): Promise<User>{
    try {
        if(body.password){
            body.password = updatePassword(body.password);
        }
        return repository.updateDataById(table, id, body);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function removeUser(id:string):Promise<void>{
    return repository.deleteDataById(table, id);
    
}

export function addUser(username:string, email:string, password:string):Promise<User>{
    try {
        const userToSave = createUser(username, email, password);
        return repository.insertNewData(table, userToSave);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    getUserById,
    getUserByUsername,
    updateUser,
    removeUser,
    addUser
}
