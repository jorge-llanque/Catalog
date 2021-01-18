import { v4 as uuidv4 } from 'uuid';

export type Rate = 'like' | 'unlike' | 'unrate';

export interface Product {
    id: string,
    idInventoryItems: string,
    imagenUrl: string,
    like: number,
    unlike: number 
}

interface RateProduct {
    id: string,
    userId: string,
    productId: string,
    admire: number
}

export function createProductForSave(item: string):Product{
    return {
        id: uuidv4(),
        idInventoryItems: item,
        imagenUrl: '/public/default-imagen',
        like: 0,
        unlike: 0
    }
}

function createRating(idProduct: string, valueRate: number, idUser: string, idRating: string): RateProduct{
    return {
        id: idRating,
        userId: idUser,
        productId: idProduct,
        admire: valueRate
    }
}

export function saveRating(idProduct: string, rate: Rate, idUser: string, idRating?: string): RateProduct{
  

    const valueRate: number = ('like'.includes(rate)) ? 1 : 0;
    if(idRating){
        return createRating(idProduct, valueRate, idUser, idRating);
    } else{
        idRating = uuidv4();
        return createRating(idProduct, valueRate, idUser, idRating);
    }
}