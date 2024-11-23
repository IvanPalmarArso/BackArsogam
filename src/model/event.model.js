//Sequelize ORM
import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const eventModel = sequelize.define('event',{
    nameEvent : {
        type : DataTypes.STRING,
        allowNull : false
    },
    imageEvent : {
        type : DataTypes.STRING,
        allowNull : false        
    }
})

export default eventModel