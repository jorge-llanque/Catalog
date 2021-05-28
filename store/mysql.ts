import mysql from 'mysql';
import config from '../config';
import {User, InventoryItem, Product} from '../core/models';

const dbconfig: any = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let connection: any;

function handleConnection(){
    connection = mysql.createConnection(dbconfig);

    connection.connect((err: any) => {
        if(err){
            console.error('[db err', err);
            setTimeout(handleConnection, 2000);
        }else{
            /* console.log('DB connected'); */
        }
    });

    connection.on('error', (err: any) => {
        console.error('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleConnection();
        }else{
            throw err;
        }
    })
}

handleConnection();

function insertNewData(table: string, data: User | InventoryItem | Product):Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err: string, result:any) => {
            if(err) return reject(err);
            resolve(data.id)
        })
    })
}

function getDataByColumn(table:string, value:string, column: string = 'id'): Promise<any>{
    
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM " + table + " WHERE `" + column + "` = BINARY " + "'" + value +"'", (err: any, result: any) => {
    
            if(result.length == 0) {

                err = Error('No exists user to matching')
                return reject(err)

            }else {

                resolve(result)
            }
        })
    })
}

function listData(table:string): Promise<any[]>{
    return new Promise<any>((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error: string, result: any) => {
            if(error) reject(error)
            resolve(result)
        })
    })
}

function updateDataById(table:string, id:string, newData:any): Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`,[newData, id], (err:string, result: any) => {
            if(err || (result.affectedRows == 0)) return reject(result);
            resolve(id);
        })
    })
}

function deleteDataById(table:string, id:string):Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id="${id}"`, (err:string, result:any) => {
            if(err) return reject(err);
            resolve(id);
        })
    })
}


function refreshRating(table:string, data:any): Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query("UPDATE `products` SET `like`= (SELECT COUNT(`rateproduct`.`admire`) FROM `rateproduct` WHERE `admire` = 1 AND `rateproduct`.`productId` = " + "'" + data.productId + "'" + "), `unlike`= (SELECT COUNT(`rateproduct`.`admire`) FROM `rateproduct` WHERE `admire` = 0 AND `rateproduct`.`productId` = " + "'" + data.productId + "'" + ") WHERE `id` = " + "'" + data.productId + "'" + "", (err:string, result:string) => {
            if(err) return reject(err);
            resolve(data.productId);
        })
    })
}

export default {
    insertNewData,
    getDataByColumn,
    listData,
    updateDataById,
    deleteDataById,
    refreshRating
}