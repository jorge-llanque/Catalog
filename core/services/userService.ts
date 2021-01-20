import { User, createUser, updateNewAttributes} from '../models';
import repository = require('../../store/mysql');
import decode = require('../../utils/auth/decodeHeader');

const table: string = 'user';

export function getUserById(token: any): Promise<User>{
    try {
        const user: any = decode.decodeHeader(token);
        return repository.getDataById(table, user.id);
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

export function updateUser(token: any, body: any): Promise<User>{
    try {
        const user: any = decode.decodeHeader(token);
        const userToSave = updateNewAttributes(body);
        return repository.updateDataById(table, user.id, userToSave);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function removeUser(token: any):Promise<void>{
    const user: any = decode.decodeHeader(token);
    return repository.deleteDataById(table, user.id);
    
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
