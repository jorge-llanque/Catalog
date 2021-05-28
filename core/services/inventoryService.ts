import {repository} from '../../store/';
import {InventoryItem, createItemForInventory} from '../models';

const table:string = 'Inventory';

export function getAllInventoryItems(): Promise<InventoryItem[]>{
    return Promise.resolve(repository.listData(table));
}

export function addItem(name: string, description: string):Promise<void>{
    try {
        const itemToSave = createItemForInventory(name, description);
        return Promise.resolve(repository.insertNewData(table, itemToSave));
    } catch (error) {
        return Promise.reject(error);
    }
}

export function updateItem(itemId:string, values: object ):Promise<void>{
    try {
        return Promise.resolve(repository.updateDataById(table, itemId, values));
    } catch (error) {
        return Promise.reject(error);
    }
}

export function removeItem(itemId:string):Promise<any>{
    try {
        return Promise.resolve(repository.deleteDataById(table, itemId));
    } catch (error) {
        return Promise.reject(error);
    }
}