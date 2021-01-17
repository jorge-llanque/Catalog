import repository = require('../../store/mysql');
import {InventoryItem, createItemForInventory} from '../models';

const table:string = 'inventory';

export function getAllInventoryItems(): Promise<InventoryItem[]>{
    return repository.listData(table);
}

export function addItem(name: string, description: string):Promise<InventoryItem>{
    try {
        const itemToSave = createItemForInventory(name, description);
        return repository.insertNewData(table, itemToSave);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function updateItem(id:string, data:object):Promise<InventoryItem>{
    try {
        return repository.updateDataById(table, id, data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function removeItem(id:string):Promise<void>{
    repository.deleteDataById('products', id);
    repository.deleteDataById(table, id);
    return Promise.resolve();
}

export default {
    getAllInventoryItems,
    addItem,
    updateItem,
    removeItem
}