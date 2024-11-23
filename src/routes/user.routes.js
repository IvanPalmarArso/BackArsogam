//Router
import { Router } from "express";
//user Methods
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../controllers/user.controller.js";
import { getOneUser } from "../controllers/user.controller.js";
import { allUsers } from "../controllers/user.controller.js";
import { addNewUser } from "../controllers/user.controller.js";
//Middlewares
import authRequired from "../middlewares/validateToken.middleware.js";
import checkAuth from '../middlewares/roleAuth.middleware.js'

const userRouter = new Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.post('/logout', logoutUser)

userRouter.post('/addNewUser', authRequired, checkAuth, addNewUser)

userRouter.get('/allUsers', authRequired, checkAuth, allUsers)

userRouter.get('/getOneUser/:id', authRequired, getOneUser)

userRouter.put('/updateUser/:id', authRequired, updateUser)

userRouter.delete('/deleteUser/:id', authRequired, deleteUser)

userRouter.get('/verify', verifyToken)

export default userRouter