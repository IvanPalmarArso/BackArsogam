//Info Model
import infoModel from "../model/info.model.js";

//Create Info Video
export const newInfoVideo = async(req, res) => {
    const videoInfo = req.file.filename

    try{

        const videoInfoUrl = `${req.protocol}://${req.get('host')}/uploads/${videoInfo}`

        const newInfo = new infoModel({
            infoVideo : videoInfoUrl
        })

        const saveNewInfo = await newInfo.save()

        res.status(200).json(saveNewInfo)

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//UpdateInfo 
export const updateInfoVideo = async (req, res) => {
    const {id} = req.params
    const videoInfo = req.file.filename

    try{

        const videoInfoUrl = `${req.protocol}://${req.get('host')}/uploads/${videoInfo}`

        const foundInfoVideo = await infoModel.findByPk(id)

        if(!foundInfoVideo) return res.status(404).json({message : 'El video no fue encontrado.'})

        foundInfoVideo.infoVideo = videoInfoUrl
        
        await foundInfoVideo.save()

        res.status(200).json(
            foundInfoVideo
        )

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//Delete InfoVideo
export const deleteInfoVideo = async(req, res) => {
    const {id} = req.params

    try{

        const deleteInfo = await infoModel.findByPk(id)

        if(!deleteInfo) return res.status(404).json({message : 'El video no ha sido encontrado.'})

        await deleteInfo.destroy()

        res.status(201)

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//Get One Gallery Image
export const getOneInfoVideo = async(req, res) => {

    const {id} = req.params

    try{

        const oneInfoVideo = await infoModel.findByPk(id)

        if(!oneInfoVideo) return res.status(404).json({message : 'Video no encontrado.'})

        res.status(200).json({
            oneInfoVideo
        })

    }catch(err){   
        res.status(500).json({message: err.message})
    }

}

//Get all InfoVideos
export const allInfoVideos = async(req, res) => {
    try{

        const allInfo = await infoModel.findAll()

        res.status(200).json(allInfo)

    }catch(err){   
        res.status(500).json({message: err.message})
    }
}