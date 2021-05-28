import { getManager, getRepository } from 'typeorm';


const listData = async (entity: string) => {
    try {
        const entityManager = getManager();
        return await entityManager.find(entity);
    } catch (error) { 
        return error;
    }
    
}

const getDataByColumn = async (entity: string, value: string, column: string = 'id') => {
    try {
        const userRepository = getRepository(entity);
        switch(column){
            case 'username':
                return await userRepository.find({ where: { username: value } })
            case 'inventory':
                return await userRepository.find({ where: { inventory : value } })
        }
    } catch (error) {   
        return error;
    }
}

const insertNewData = async ( entity: string, data: any ) => {
    try {
        console.log(data)
        const entityManager = getManager();
        await entityManager.insert(entity, data)
    } catch (error) {
        return error
    }
}

const updateDataById = async (entity:string, id: string, data: any) => {
    try {
        const entityManager = getManager();
        await entityManager.update(entity, id, data);
    } catch (error) {
        return error;
    }
}

const deleteDataById = async (entity: string, id:string) => {
    try {
        const entityManager = getManager();
        await entityManager.delete(entity, id);
    } catch (error) {
        return error;
    }
}

const insertNewRating = async ( entity: string, data: any ) => {
    try {
        const entityManager = getManager();
        await entityManager.findOneOrFail(entity, {where: { user: data.user }})
        await entityManager.insert(entity, data)
    } catch (error) {
        return error
    }
}

export default {
    insertNewData,
    listData,
    getDataByColumn,
    updateDataById,
    deleteDataById,
    insertNewRating
}

