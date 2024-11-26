//Sequelize
import { Sequelize } from "sequelize";
//Dotenv
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
    /*process.env.DATABASE_NAME ||*/ "arsogam",
    /*process.env.DATABASE_USER ||*/ "root",
    /*process.env.DATABASE_PASSWORD ||*/ "",
    {
        host : /*process.env.DATABASE_HOST ||*/ "localhost",
        port : /*process.env.DATABASE_PORT ||*/ 3306,
        dialect : "mysql"
    }
)

export default sequelize