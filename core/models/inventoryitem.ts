import { v4 as uuidv4 } from 'uuid';

export interface InventoryItem {
    id: string,
    name: string,
    description: string
}

export function createItemForInventory(name: string, description: string): InventoryItem{
    return {
        id: uuidv4(),
        name: name,
        description: description
    }
}
