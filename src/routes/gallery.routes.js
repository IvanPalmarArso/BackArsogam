//Router
import { Router } from "express";
//Gallery Methods
import { newGalleryImage } from "../controllers/gallery.controller.js";
import { updateGalleryImage } from "../controllers/gallery.controller.js";
import { deleteGalleryImage } from "../controllers/gallery.controller.js";
import { getOneGalleryImage } from "../controllers/gallery.controller.js";
import { allGalleryImage } from "../controllers/gallery.controller.js";
//Middleware
import authRequired from "../middlewares/validateToken.middleware.js";
import checkAuth from "../middlewares/roleAuth.middleware.js";
//Uploads Image
import uploads from "../middlewares/uploadFile.middleware.js";

const galleryRouter = new Router()

//New GalleryImage
galleryRouter.post('/newGallery', authRequired, checkAuth,newGalleryImage)

//Update GalleryImage
galleryRouter.put('/updateGallery/:id', authRequired, checkAuth, uploads.single('galleryImage'),updateGalleryImage)

//Delete GalleryImage
galleryRouter.delete('/deleteGallery/:id', authRequired, checkAuth, deleteGalleryImage)

//Get One GalleryImage
galleryRouter.get('/getOneGallery/:id', authRequired, checkAuth, getOneGalleryImage)

//Get All GalleryImages
galleryRouter.get('/allGallery', allGalleryImage)

export default galleryRouter