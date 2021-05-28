import { v4 as uuidv4 } from 'uuid';

export type Rate = 'like' | 'unlike' | 'unrate';

export interface Product {
    id: string,
    inventory: string,
    imagenUrl: string,
    like: number,
    unlike: number 
}

interface RateProduct {
    id: string,
    user: string,
    product: string,
    admire: boolean
}

export function createProductForSave(item: string):Product{
    return {
        id: uuidv4(),
        inventory: item,
        imagenUrl: '/public/default-imagen',
        like: 0,
        unlike: 0
    }
}

function createRating(idProduct: string, valueRate: boolean, idUser: string, idRating: string): RateProduct{
    return {
        id: idRating,
        user: idUser,
        product: idProduct,
        admire: valueRate
    }
}

export function saveRating(idProduct: string, rate: Rate, idUser: string, idRating?: string): RateProduct{

    const valueRate: boolean = (rate == 'like') ? true : false;
    console.log(valueRate)
    if(idRating){
        return createRating(idProduct, valueRate, idUser, idRating);
    } else{
        idRating = uuidv4();
        return createRating(idProduct, valueRate, idUser, idRating);
    }
}