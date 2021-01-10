const db:any = {
    'user':[
        {id:"1", name:"Carlos"},
        {id:"2", name:"Camila"},
        {id:"3", name:"Carla"},
        {id:"4", name:"Castillo"}
    ]
};

async function listdata(tabla:any){
    return db[tabla] || [];
}

module.exports = {
    listdata
}