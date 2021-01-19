import multer from 'multer';
import config from '../../config';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/')
    },
    filename: function(req, file, cb){
        const extension: string = file.originalname.slice(-4);
        cb(null, Date.now() + extension)
    }
})



const upload = multer({
    storage: storage
})


const cpUpload: any = upload.any();

export default cpUpload