//Gallery Model
import cloudinary from "../middlewares/cloudinary.middlewware.js";
import galleryModel from "../model/gallery.model.js";

//Create Gallery image
export const newGalleryImage = async (req, res) => {
    const {nameImage} = req.body        

    const galleryImage = req.file.path

    const cloudGall = await cloudinary.uploader.upload(galleryImage,{
        resource_type: "auto",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "mov", "avi", "webm"],
        transformation: {
            width: 600,
            height: 600,
            quality: 85
        }
    })

    try{               
        const newImageGallery = new galleryModel({
            nameImage : nameImage,
            galleryImage : cloudGall.url,
            idUser : req.user.id
        })

        const saveNewGalleryImage = await newImageGallery.save()
        
        res.status(200).json(saveNewGalleryImage)        


    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

//Update Gallery image
export const updateGalleryImage = async (req, res) => {
    const {id} = req.params
    const {nameImage} = req.body    
    const galleryImage = req.file.filename

    const cloudGall = await cloudinary.uploader.upload(galleryImage,{
        resource_type: "auto",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "mov", "avi", "webm"],
        transformation: {
            width: 600,
            height: 600,
            quality: 85
        }
    })

    try{            

        const foundGalleryImage = await galleryModel.findByPk(id)

        if(!foundGalleryImage) return res.status(404).json({message : 'La imagen de la galeria no se ha podido encontrar'})

        foundGalleryImage.nameImage = nameImage
        foundGalleryImage.galleryImage = cloudGall.url
        foundGalleryImage.idUser = req.user.id        

        await foundGalleryImage.save()

        res.status(200).json(
            foundGalleryImage
        )

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

//Delete Gallery image
export const deleteGalleryImage = async (req, res) => {
    const {id} = req.params        

    try{

        const deleteGalleryImage = await galleryModel.findByPk(id)

        if(!deleteGalleryImage) return res.status(404).json({message : 'La imagen de la galeria no ha sido encontrada'})

        await deleteGalleryImage.destroy()

        res.status(201).json({message : 'La imagen de la galeria ha sido eliminada correctamente'})
        
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

//Get One Gallery image
export const getOneGalleryImage = async (req, res) => {
    const {id} = req.params

    try{
        
        const oneImageGallery = await galleryModel.findByPk(id)

        if(!oneImageGallery) return res.status(404).json({message : 'La imagen de la galeria no ha sido encontrada'})

        res.status(200).json(
            oneImageGallery
        )

    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

//Get all gallery images
export const allGalleryImage = async (req, res) => {
    try{

        const allGalleryImages = await galleryModel.findAll()
    
        res.status(200).json(allGalleryImages)

    }catch(err){    
        return res.status(500).json({message : err.message});
    }
}