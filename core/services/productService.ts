import repository = require('../../store/mysql');
import {Product, createProductForSave, Rate, saveRating} from '../models';

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

export function rateProduct(productId: string, rate:Rate, data: any): Promise<void>{
    try {
        if(!data.idRating){
            const addRating: any = saveRating(productId, rate, data.userId);
            repository.insertNewData('rateproduct', addRating);
            return repository.refreshRating(table, addRating);
        }else{
            const addRating: any = saveRating(productId, rate, data.userId, data.idRating);
            repository.updateDataById('rateproduct', data.idRating, addRating);
            return repository.refreshRating(table, addRating);
        }
        
    } catch (error) {
        return Promise.reject(error);
    }
    
}
export function unRateProduct(idRating: string, productId: string): Promise<void>{

    const data = {
        productId: productId
    }
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