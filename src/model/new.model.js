//Sequelize ORM
import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const newModel = sequelize.define('new',{
    newName : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    imageNew : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    textNew : {
        type : DataTypes.TEXT,
        allowNull : false
    }
}) 

export default newModel