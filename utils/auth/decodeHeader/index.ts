import jwt from 'jsonwebtoken';
import config from '../../../config';

const secret = config.jwt.secretkey;
function verify(token: any){
    return jwt.verify(token, secret);
}

function getToken(auth: any){
    if(!auth){
        throw new Error('There is not a token');
    }
    if(auth.indexOf('Bearer ') === -1){
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

export function decodeHeader(authorization: string){
    const token = getToken(authorization);
    const decoded = verify(token);

    return decoded;

}

module.exports = {
    decodeHeader
}




