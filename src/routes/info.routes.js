//Router
import { Router } from "express";
//Info Methods
import { newInfoVideo } from "../controllers/info.controller.js";
import { updateInfoVideo } from "../controllers/info.controller.js";
import { deleteInfoVideo } from "../controllers/info.controller.js";
import { getOneInfoVideo } from "../controllers/info.controller.js";
import { allInfoVideos } from "../controllers/info.controller.js";
//Middleware
import authRequired from "../middlewares/validateToken.middleware.js";
import checkAuth from "../middlewares/roleAuth.middleware.js";
//Uploads Video
import uploads from "../middlewares/uploadFile.middleware.js";

const infoRouter = new Router()

//New Info Video
infoRouter.post('/newInfo', authRequired, checkAuth, uploads.single('videoInfo'), newInfoVideo)

//Update Info Video
infoRouter.put('/updateInfo/:id', authRequired, checkAuth, uploads.single('videoInfo'), updateInfoVideo)

//Delete Info Video
infoRouter.delete('/deleteInfo/:id', authRequired, checkAuth, deleteInfoVideo)

//Get One Info Video
infoRouter.get('/getOneInfo/:id', authRequired, checkAuth, getOneInfoVideo)

//Get All Info Video
infoRouter.get('/allInfo', allInfoVideos)

export default infoRouter