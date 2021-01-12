import mysql from 'mysql';

import config from '../config';

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

function listdata(table:string){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err:string, data:string) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

function get(table:string, id:string){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err:string, data:string) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

function removeItem(table:string, id:string){
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id="${id}"`, (err:string, data:string) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

function getByUsername(table:string, username:string){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE username = ${username}`, (err:string, data:string) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table:string, data:any){
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err:string, result:string) => {
            console.log(err);
            if(err) return reject(err);
            resolve(data);
        })
    })
}

function update(table:string, data:any){
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err:string, result:string) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

function refreshRating(table:string, data:any){
    return new Promise((resolve, reject) => {
        connection.query("UPDATE `products` SET `like`= (SELECT COUNT(`rateproduct`.`admire`) FROM `rateproduct` WHERE `admire` = 1 AND `rateproduct`.`productId` = " + "'" + data.productId + "'" + "), `unlike`= (SELECT COUNT(`rateproduct`.`admire`) FROM `rateproduct` WHERE `admire` = 0 AND `rateproduct`.`productId` = " + "'" + data.productId + "'" + ") WHERE `id` = " + "'" + data.productId + "'" + "", (err:string, result:string) => {
            if(err) return reject(err);
            console.log(err);
            resolve(data);
        })
    })
}

function query(table:string, query:string, join:any){
    let joinQuery = '';
    if(join){
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err:string, res:string) => {
            if(err) return reject(err);
            resolve(res[0] || null);
        })
    })
}


module.exports = {
    listdata,
    get,
    getByUsername,
    insert,
    update,
    removeItem,
    refreshRating,
    query
}