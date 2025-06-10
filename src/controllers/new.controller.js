//New Model
import newModel from "../model/new.model.js";
//Cloudinary
import cloudinary from "../middlewares/cloudinary.middlewware.js";

//New New
export const newNew = async(req, res) => {
    const {newName, textNew} = req.body         
    const imageNew = req.file.path

    const cloudNew = await cloudinary.uploader.upload(imageNew,{
        resource_type: "auto",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "mov", "avi", "webm"],
        transformation: {
            width: 600,
            height: 600,
            quality: 85
        }
    })

    try{        
        const newNewPost = new newModel({
            newName : newName,
            imageNew : cloudNew.url,
            textNew : textNew,
            idUser : req.user.id
        })

        const saveNewNew = await newNewPost.save()

        res.status(200).json(saveNewNew)

    }catch(e){
        return res.status(500).json({message : e.message})
    }
}

//Update New
export const updateNew = async(req, res) => {
    const {id} = req.params
    const {newName, textNew} = req.body
    const imageNew = req.file.path

    const cloudNew = await cloudinary.uploader.upload(imageNew,{
        resource_type: "auto",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "mov", "avi", "webm"],
        transformation: {
            width: 600,
            height: 600,
            quality: 85
        }
    })

    try{
        //New Found
        const newFound = await newModel.findByPk(id)

        if(!newFound) return res.status(404).json({message : 'La noticia no ha sido encontrada.'})

        newFound.newName = newName
        newFound.textNew = textNew
        newFound.imageNew = cloudNew.url
        newFound.idUser  = req.user.id

        await newFound.save()

        res.status(200).json(newFound)

    }catch(err){
        return res.status(500).json({ message : err.message })
    }
}

//Delete New
export const deleteNew = async(req, res) => {
    const {id} = req.params

    try{
        //Found New
        const newFound = await newModel.findByPk(id)

        if(!newFound) return res.status(404).json({ message : 'La noticia no ha sido encontrada.' })

        await newFound.destroy()

        res.status(201).json({
            message : 'La noticia ha sido eliminada correctamente.'
        })

    }catch(err){
        return res.status(500).json({ message : err.message })
    }
}

//Get One New
export const getOneNew = async(req, res) => {
    const {id} = req.params

    try{

        //New Found
        const newFound = await newModel.findByPk(id)
        if(!newFound) return res.status(404).json({ message : 'La noticia no ha sido encontrada' })

        res.status(200).json(newFound)

    }catch(err){
        return res.status(500).json({ message : err.message })
    }
}

//Get All News
export const allNews = async (req, res) => {
    try{

        const getAllNews = await newModel.findAll()

        res.status(200).json(getAllNews)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}