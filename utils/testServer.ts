import express from 'express';
import supertest from 'supertest';

export default function testServer(route){
    
    const app = express();
    route(app);
    return supertest(app);
}