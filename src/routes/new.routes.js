//Express Router
import Router from 'express'
//New Methods
import { newNew } from '../controllers/new.controller.js'
import { updateNew } from '../controllers/new.controller.js'
import { deleteNew } from '../controllers/new.controller.js'
import { getOneNew } from '../controllers/new.controller.js'
import { allNews } from '../controllers/new.controller.js'
//Middleware
import authRequired from '../middlewares/validateToken.middleware.js'
import checkAuth from '../middlewares/roleAuth.middleware.js'
import uploads from '../middlewares/uploadFile.middleware.js'

//New Router
const newRouter = new Router()

//New Method
newRouter.post('/postNew', authRequired, checkAuth, uploads.single('imageNew'), newNew)

//Update New
newRouter.put('/updateNew/:id', authRequired, checkAuth, uploads.single('imageNew'), updateNew)

//Delete New
newRouter.delete('/deleteNew/:id', authRequired, checkAuth, deleteNew)

//Get One New
newRouter.get('/getOneNew/:id', authRequired, checkAuth, getOneNew)

//All News
newRouter.get('/allNews', allNews)

export default newRouter