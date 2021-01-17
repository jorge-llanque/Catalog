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


export function saveImage(id: string):Promise<void>{
    try {
        const data = {
            imagenUrl: '/public/newRoute'
        }
        return repository.updateDataById(table, id, data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function removeProduct(id: string): Promise<void>{
    repository.deleteDataById(table, id);
    return Promise.resolve();
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
export function unRateProduct(idRating: string, data: any): Promise<void>{
    Promise.resolve(repository.deleteDataById('rateproduct', idRating));
    Promise.resolve(repository.refreshRating(table, data));
    return Promise.resolve();
}

export default {
    getAllProduct,
    addProduct,
    saveImage,
    removeProduct,
    rateProduct,
    unRateProduct
}