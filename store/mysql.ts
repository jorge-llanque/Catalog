import { rejects } from 'assert';
import mysql from 'mysql';
import config from '../config';
import {User, InventoryItem, Product} from '../core/models';

const dbconfig:any = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let connection:any;

function handleConnection(){
    connection = mysql.createConnection(dbconfig);

    connection.connect((err:any) => {
        if(err){
            console.error('[db err', err);
            setTimeout(handleConnection, 2000);
        }else{
            console.log('DB connected');
        }
    });
    connection.on('error', (err:any) => {
        console.error('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleConnection();
        }else{
            throw err;
        }
    })
}

handleConnection();


export function getDataById(table:string, id:string): Promise<User>{
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `"+ table +"` WHERE `id` = '" + id +"'", (err:string, data:User) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

export function updateDataById(table:string, id:string, newData:any): Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`,[newData, id], (err:string, result: any) => {
            if(err || (result.affectedRows == 0)) return reject(result);
            resolve(id);
        })
    })
}

export function deleteDataById(table:string, id:string):Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id="${id}"`, (err:string, result:any) => {
            if(err) return reject(err);
            resolve(id);
        })
    })
}

export function insertNewData(table: string, data: User | InventoryItem | Product):Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err: string, result:any) => {
            if(err) return reject(err);
            resolve(data.id)
        })
    })
}

export function listData(table:string): Promise<any[]>{
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err:string, data:any) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

export function refreshRating(table:string, data:any): Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query("UPDATE `products` SET `like`= (SELECT COUNT(`rateproduct`.`admire`) FROM `rateproduct` WHERE `admire` = 1 AND `rateproduct`.`productId` = " + "'" + data.productId + "'" + "), `unlike`= (SELECT COUNT(`rateproduct`.`admire`) FROM `rateproduct` WHERE `admire` = 0 AND `rateproduct`.`productId` = " + "'" + data.productId + "'" + ") WHERE `id` = " + "'" + data.productId + "'" + "", (err:string, result:string) => {
            if(err) return reject(err);
            resolve(data.productId);
        })
    })
}

export function getDataByUsername(table:string, username:string): any{
    console.log(username, 'mysql/username')
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM " + table + " WHERE `username` = BINARY " + "'" + username +"'", (err: any, result: any) => {
            
            console.log(result.length, 'mysql/result');
            if(result.length == 0) {
                console.log('error validado')
                err = Error('No exists data to matching')
                return reject(err)
                /* reject(new Error('no exists data')) */
            }else {
                console.log('error no validado')
                resolve(result)
            }
        })
    })
}

export function getDataByInventoryItem(table:string, column:string): Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM " + table + " WHERE idInventoryItems = BINARY " + "'" + column +"'", (err: any, result: any) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}





/* ************************ */
/* 
function query(table:string, query:string, join?:any){
    let joinQuery = '';
    if(join){
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err:string, res:string) => {
            console.log(err, "error desde mysql");
            if(err) return reject(err);
            resolve(res[0] || null);
        })
    })
} */


module.exports = {
    getDataById,
    updateDataById,
    deleteDataById,
    insertNewData,
    getDataByUsername,
    listData,
    refreshRating,
    getDataByInventoryItem
}