import {repository} from '../../store/';
import {Product, createProductForSave, Rate, saveRating} from '../models';
import decode from '../../utils/auth/decodeHeader';

const table: string = 'products';
const column: string = 'idInventoryItems';

export function getAllProduct():Promise<Product[]>{

    return Promise.resolve(repository.listData(table));
}

export function addProduct(item: string):Promise<string>{
    try {
        const productToSave = createProductForSave(item);

        const idInventoryExists = repository.getDataByColumn(table, productToSave.idInventoryItems, column);
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
        
        const user:any = decode(data.authorization);

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