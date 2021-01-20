import repository = require('../../store/mysql');
import {Product, createProductForSave, Rate, saveRating} from '../models';
import decode  = require('../../utils/auth/decodeHeader');
import config from '../../config';

const table:string = 'products';

export function getAllProduct():Promise<Product[]>{
    return Promise.resolve(repository.listData(table));
}

export function addProduct(item: string):Promise<string>{
    try {
        const productToSave = createProductForSave(item);

        const idInventoryExists: any = repository.getDataByInventoryItem(table, productToSave.idInventoryItems);
        return idInventoryExists.then((data: any) => {
            console.log(data, 'DATA');
            if(data.length != 0){
                return Promise.reject('Id inventory exists');        
            }else {
                return Promise.resolve(repository.insertNewData(table, productToSave));
            }
        })
    } catch (error) {
        return Promise.reject(error);
    }
}


export function saveImage(productId: string, image: any):Promise<string>{
    try {
        const data = {
            imagenUrl: image[0].path
        }
        return Promise.resolve(repository.updateDataById(table, productId, data));
    } catch (error) {
        return Promise.reject(error);
    }
}

export function removeProduct(productId: string): Promise<string>{
    return Promise.resolve(repository.deleteDataById(table, productId));
}

export function rateProduct(data: any): Promise<string>{
    try {
        
        const user:any = decode.decodeHeader(data.authorization);

        if(!data.ratingId){
            const addRating: any = saveRating(data.productId, data.rate, user.id);
            repository.insertNewData('rateproduct', addRating);
            return repository.refreshRating(table, addRating);
        }else{
            const addRating: any = saveRating(data.productId, data.rate, user.id, data.ratingId);
            repository.updateDataById('rateproduct', data.ratingId, addRating);
            return repository.refreshRating(table, addRating);
        }
        
    } catch (error) {
        return Promise.reject(error);
    }
    
}
export function unRateProduct(idRating: string): Promise<string>{
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