import express from "express";
import morgan from "morgan";
//Cookie-parser
import cookieParser from "cookie-parser";
//Cors
import cors from 'cors';
//Routers
import emailHelperR from "./routes/emailHelp.route.js";
import pqrRouter from "./routes/pqrsHelp.route.js";
import userRouter from "./routes/user.routes.js";
import galleryRouter from "./routes/gallery.routes.js";
import eventsRouter from "./routes/event.routes.js";
import newRouter from "./routes/new.routes.js";
//Dotenv
import dotenv from 'dotenv'
dotenv.config()
//Static Files
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from "path";

//Express
const app = express();

//Cors
app.use(
    cors({       
        origin: 'https://arsogam.netlify.app/',                
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
        credentials : true,        
    })
)
//Morgan
app.use(morgan('dev'))
//App Json
app.use(express.json())
//Cookies parser
app.use(cookieParser())
//Parsign application
app.use(express.urlencoded({extended : true}))
//Static Files
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use('/uploads', express.static(path.join(__dirname,'uploads')))

//Request Options
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', 'https://arsogam.netlify.app/')    
    res.append('Access-Control-Allow-Headers', 'Content-Type, Origin')    
    next()
})
//Mail Router
app.use('/api', emailHelperR)
//PQR Router
app.use('/api', pqrRouter)
//User Router
app.use('/api', userRouter)
//GalleryRouter
app.use('/api', galleryRouter)
//EventsRouter
app.use('/api', eventsRouter)
//NewRouter
app.use('/api', newRouter)

export default app