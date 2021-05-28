export const inventoryMock = [
    {
        id: "6f52d4d1-1a4e-4079-920b-a01b5b48f3fc",
        name: "Chrysler",
        description: "eleifend donec ut dolor morbi vel lectus in"
    }
];
export function getAllInventoryItems(): Promise<any> {
    return Promise.resolve(inventoryMock);
}

export function createItem(): Promise<any> {
    return Promise.resolve(inventoryMock[0]);
}