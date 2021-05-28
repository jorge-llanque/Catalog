import {repository} from '../../store/';
import {Product, createProductForSave, Rate, saveRating} from '../models';
import decode from '../../utils/auth/decodeHeader';

const table: string = 'Products';
const column: string = 'inventory';

export function getAllProduct():Promise<Product[]>{
    return Promise.resolve(repository.listData(table));
}

export function addProduct(item: string):Promise<void>{
    try {
        
        const productToSave = createProductForSave(item);
        return Promise.resolve(repository.insertNewData(table, productToSave));

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

        const user:any = decode(data.authorization);

        if(!data.ratingId){
            const addRating: any = saveRating(data.productId, data.rate, user.id);
            repository.insertNewData('RateProduct', addRating);
            /* return repository.refreshRating(table, addRating); */
            return Promise.resolve('Not implemented')
        }else{
            const addRating: any = saveRating(data.productId, data.rate, user.id, data.ratingId);
            repository.updateDataById('RateProduct', data.ratingId, addRating);
            /* return repository.refreshRating(table, addRating); */
            return Promise.resolve('Not implemented')
        }
        
    } catch (error) {
        return Promise.reject(error);
    }
    
}
export function unRateProduct(idRating: string): Promise<string>{
    return repository.deleteDataById('rateproduct', idRating);
}