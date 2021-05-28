import * as dotenv from 'dotenv';
dotenv.config();

export default {
    api:{
        host: process.env.HOST || 'http://localhost',
        port: process.env.API_PORT || 3000,
        dev: process.env.NODE_ENV
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || 'catalog_project',
    },
    jwt: {
        secretkey: process.env.SECRET_KEY || 'notesecret!'
    },
    files: {
        publicRoute: process.env.PUBLIC_ROUTE || '/app',
        filesRoute: process.env.PUBLIC_ROUTE || 'files'
    }
}