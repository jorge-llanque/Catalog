import { v4 as uuidv4 } from 'uuid';

const TABLA = "rateproduct";

module.exports = function(injectedStore:any){
    let store = injectedStore;

    async function rateProduct(body:any, rate:string){
            if(rate == "like"){
                
                    const data = {
                        id:'',
                        userId: body.userId,
                        productId: body.productId,
                        admire:1
                    }
                    try{
                        if(body.id){
                            data.id = body.id;
                            await store.update(TABLA, data);
                            await store.refreshRating(TABLA, data);
                            return true
                        }else{
                            data.id = uuidv4();
                            await store.insert(TABLA, data);
                            await store.refreshRating(TABLA, data);
                            return true
                        }
                    }catch(e){
                        console.log(e);
                        return e
                    }
    
            }else if(rate == "unlike"){
                const data = {
                    id: '',
                    userId: body.userId,
                    productId: body.productId,
                    admire:0,
                }
                if(body.id){
                    data.id = body.id;
                    await store.update(TABLA, data);
                    await store.refreshRating(TABLA, data);
                    return true
                }else{
                    data.id = uuidv4();
                    await store.insert(TABLA, data);
                    await store.refreshRating(TABLA, data);
                    return true
                }
            }
        
    }

    async function unRate(body:any){
        try {
            const data = {
                productId: body.productId
            }
            await store.removeItem(TABLA, body.id);
            await store.refreshRating(TABLA, data)
            return true
        } catch (error) {
            console.log(error);
            return error
        }
        
    }

    return {
        rateProduct,
        unRate
    }
}