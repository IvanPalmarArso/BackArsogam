//Event Model
import cloudinary from "../middlewares/cloudinary.middlewware.js";
import eventModel from "../model/event.model.js";

//New Event
export const newEvent = async(req, res) => {
    const {nameEvent} = req.body    
    const imageEvent = req.file.path

  const imgCloud = await cloudinary.uploader.upload(imageEvent, {
        resource_type: "auto",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "mov", "avi", "webm"],
        transformation: {
            width: 600,
            height: 600,
            quality: 85
        }
    });
    
    try{    
        const newEventPost = new eventModel({
            nameEvent : nameEvent,
            imageEvent : imgCloud.url,
            idUser : req.user.id
        })

        const saveNewEvent = await newEventPost.save()

        res.status(200).json(saveNewEvent, imgCloud.url)

    }catch(e){
        return res.status(500).json({message : e.message});
    }

}

//Update Event
export const updateEvent = async (req, res) => {
    const {id} = req.params
    const {nameEvent} = req.body    
    const imageEvent = req.file.filename    

    try{

        const imageEventUrl = `${req.protocol}://${req.get('host')}/uploads/${imageEvent}`

        //Event Found
        const eventFound = await eventModel.findByPk(id)

        if(!eventFound) return res.status(404).json({message : 'Evento no encontrado'})

        eventFound.nameEvent = nameEvent
        eventFound.imageEvent = imageEventUrl
        eventFound.idUser = req.user.id

        await eventFound.save()

        res.status(200).json(
            eventFound
        )

    }catch(e){
        return res.status(500).json({message : e.message})
    }
}

//Delete Event
export const deleteEvent = async (req, res) => {
    const {id} = req.params

    try{

        //Event Found
        const eventFound = await eventModel.findByPk(id)

        if(!eventFound) return res.status(500).json({ message : 'El evento no ha sido encontrado' })

        await eventFound.destroy()

        res.status(201).json({message : 'El evento ha sido eliminado correctamente'})

    }catch(e){
        return res.status(500).json({message : e.message})
    }
}

//Get One Event
export const getOneEvent = async (req, res) => {

    const {id} = req.params

    try{

        const foundEvent = await eventModel.findByPk(id)

        if(!foundEvent) return res.status(404).json({message : 'El evento no ha sido encontrado'})

        res.status(200).json(
            foundEvent
        )

    }catch(e){
        return res.status(500).json({message : e.message})
    }
}

//Get All Events
export const getAllEvents = async (req, res) => {
    try{

        //All Events
        const allEvents = await eventModel.findAll()

        res.status(200).json(allEvents)

    }catch(e){
        return res.status(500).json({message : e.message})
    }
}