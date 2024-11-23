//Sequelize ORM
import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const galleryModel = sequelize.define('gallery',{
    nameImage : {
        type : DataTypes.STRING,
        allowNull : false
    },
    galleryImage : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

export default galleryModel