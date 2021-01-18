import repository = require('../../store/mysql');
import {Product, createProductForSave, Rate, saveRating} from '../models';
import decode  = require('../../utils/auth/decodeHeader');

const table:string = 'products';

export function getAllProduct():Promise<Product[]>{
    return repository.listData(table);
}

export function addProduct(item: string):Promise<Product>{
    try {
        const productToSave = createProductForSave(item);
        return repository.insertNewData(table, productToSave);
    } catch (error) {
        return Promise.reject(error);
    }
}


export function saveImage(productId: string):Promise<void>{
    try {
        const data = {
            imagenUrl: '/public/newRoute'
        }
        return repository.updateDataById(table, productId, data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function removeProduct(id: string): Promise<void>{
    const deleteProductId: any = repository.deleteDataById(table, id);
    return deleteProductId;
}

export function rateProduct(data: any): Promise<void>{
    try {
        
        const user:any = decode.decodeHeader(data.authorization);

        if(!data.ratingId){
            const addRating: any = saveRating(data.id, data.rate, user.id);
            repository.insertNewData('rateproduct', addRating);
            return repository.refreshRating(table, addRating);
        }else{
            const addRating: any = saveRating(data.id, data.rate, user.id, data.ratingId);
            repository.updateDataById('rateproduct', data.ratingId, addRating);
            return repository.refreshRating(table, addRating);
        }
        
    } catch (error) {
        return Promise.reject(error);
    }
    
}
export function unRateProduct(idRating: string): Promise<void>{
    return repository.deleteDataById('rateproduct', idRating);
}

export default {
    getAllProduct,
    addProduct,
    saveImage,
    removeProduct,
    rateProduct,
    unRateProduct
}