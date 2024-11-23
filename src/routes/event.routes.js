//Express Router
import Router from 'express'
//Event Methods
import { newEvent } from '../controllers/event.controller.js'
import { updateEvent } from '../controllers/event.controller.js'
import { deleteEvent } from '../controllers/event.controller.js'
import { getOneEvent } from '../controllers/event.controller.js'
import { getAllEvents } from '../controllers/event.controller.js'
//Middlewares
import authRequired from '../middlewares/validateToken.middleware.js'
import checkAuth from '../middlewares/roleAuth.middleware.js'
import uploads from '../middlewares/uploadFile.middleware.js'

//Event Router
const eventsRouter = new Router()

//New Event
eventsRouter.post('/newEvent', authRequired, checkAuth, uploads.single('imageEvent'), newEvent)

//Update Event
eventsRouter.put('/updateEvent/:id', authRequired, checkAuth, uploads.single('imageEvent'), updateEvent)

//Delete Event
eventsRouter.delete('/deleteEvent/:id', authRequired, checkAuth, deleteEvent)

//Get One Event
eventsRouter.get('/getOneEvent/:id', authRequired, checkAuth, getOneEvent)

//All Events
eventsRouter.get('/allEvents', getAllEvents)

export default eventsRouter