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
import infoRouter from "./routes/info.routes.js";
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
app.use(cors({
    origin : ['https://arsogam.com','https://arsogam.netlify.app','http://localhost:5173','https://backarsogam-production.up.railway.app'],
    credentials : true,
    methods : ['POST', 'PUT', 'DELETE', 'OPTIONS', 'GET'],
    allowedHeaders : ['Content-Type', 'Authorization']
}))

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.sendStatus(200);
    }
    next();
});

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
//InfoRouter
app.use('/api', infoRouter)

export default app