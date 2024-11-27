//DotEnv
import dotenv from 'dotenv'
dotenv.config()
//Cloudinary
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET_KEY,      
})

export const uploadImage = async(filePath) => {
    return await cloudinary.uploader.upload(filePath,{
        transformation : {
            height : 100,
            width : 100,
            quality : 85
        }
    })
}

export default cloudinary