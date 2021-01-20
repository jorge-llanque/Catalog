import repository = require('../../store/mysql');
import {InventoryItem, createItemForInventory} from '../models';

const table:string = 'inventory';

export function getAllInventoryItems(): Promise<InventoryItem[]>{
    return Promise.resolve(repository.listData(table));
}

export function addItem(name: string, description: string):Promise<string>{
    try {
        const itemToSave = createItemForInventory(name, description);
        return repository.insertNewData(table, itemToSave);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function updateItem(itemId:string, values: object ):Promise<string>{
    try {
        return repository.updateDataById(table, itemId, values);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function removeItem(itemId:string):Promise<string>{
    try {
        return repository.deleteDataById(table, itemId);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    getAllInventoryItems,
    addItem,
    updateItem,
    removeItem
}