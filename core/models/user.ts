import { v4 as uuidv4 } from 'uuid';

export type User = {
    id: string,
    fullname: string,
    lastname: string,
    username: string,
    password: string
    email: string,
    role: string,

}

export function createUser(username: string, fullname: string, lastname: string, email: string, role:string, password:string): User{
    return {
        id: uuidv4(),
        username: username, 
        fullname: fullname, 
        lastname: lastname, 
        email: email, 
        role: role, 
        password: password
    }
}