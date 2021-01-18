import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export interface User {
    id: string,
    username: string,
    email: string,
    password: string
    role: string,
}

export enum RoleUser {
    Writer = 'writer',
    Customer = 'customer',
    Admin = 'admin'
}

function encryptPassword(pass: string): string{
    const saltRounds: number = 10;
    const salt: any = bcrypt.genSaltSync(saltRounds);
    const hash: string = bcrypt.hashSync(pass, salt);
    return hash;
}

export function createUser(username: string, email: string, password:string): User{
    return {
        id: uuidv4(),
        username: username,
        email: email, 
        password: encryptPassword(password),
        role: RoleUser.Customer
    }
}

export function updatePassword(password: string){
    return encryptPassword(password);
}