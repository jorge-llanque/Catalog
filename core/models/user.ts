import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export interface User {
    id: string,
    username: string,
    email: string,
    password: string
    role: string,
}

export enum Role {
    Writer = 'writer',
    Customer = 'customer',
    Admin = 'admin'
}

function encryptPassword(pass: string): string{
    const saltRounds: number = 10;
    const salt: string = bcrypt.genSaltSync(saltRounds);
    const hash: string = bcrypt.hashSync(pass, salt);
    return hash;
}

export function createUser(username: string, email: string, password:string): User{
    return {
        id: uuidv4(),
        username: username,
        email: email, 
        password: encryptPassword(password),
        role: Role.Customer
    }
}

export function updateNewAttributes(args: any): object {
    const newValues: any = {
        ...args
    }

    if(args.hasOwnProperty('password') && args.password != ""){
        newValues.password = encryptPassword(args.password)
    }

    return newValues
}