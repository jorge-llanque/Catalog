import { User, createUser, updateNewAttributes} from '../models';
import {repository} from '../../store/';
import decode from '../../utils/auth/decodeHeader';

const table: string = 'user';
const column: string = 'username';

export function getUserById(token: any): Promise<User>{
    try {
        const user: any = decode(token);
        return repository.getDataByColumn(table, user.id);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function getUserByUsername(name: string): Promise<[]>{
    try {
        return Promise.resolve(repository.getDataByColumn(table, name, column));
    } catch (error) {
        return Promise.reject(error);
    }
}

export function updateUser(token: string | undefined, values: object): Promise<string>{
    try {
        const user: any = decode(token);
        const userToSave: object = updateNewAttributes(values);
        return repository.updateDataById(table, user.id, userToSave);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function removeUser(token: string | undefined):Promise<string>{
    const user: any = decode(token);
    return repository.deleteDataById(table, user.id);
    
}

export function addUser(username: string, email: string, password: string):Promise<string>{
    try {
        const userToSave = createUser(username, email, password);
        return repository.insertNewData(table, userToSave);
    } catch (error) {
        return Promise.reject(error);
    }
}