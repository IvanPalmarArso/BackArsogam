//Router
import { Router } from "express";
//Send email method
import sendEmail from "../controllers/emailHelper.controller.js";

const emailHelperR = new Router();

emailHelperR.post('/sendEmail', sendEmail)

export default emailHelperR