//Router
import { Router } from "express";
//Send PQR Method
import { sendPQR } from "../controllers/pqrsHelper.controller.js";

const pqrRouter = new Router()

pqrRouter.post('/sendPQR', sendPQR)

export default pqrRouter