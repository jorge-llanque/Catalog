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
    query,
}