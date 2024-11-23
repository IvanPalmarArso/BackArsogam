//ORM Sequelize
import sequelize from "../db.js";
import { DataTypes } from "sequelize";
//Foreign Model
import newModel from "./new.model.js";
import eventModel from "./event.model.js";
import galleryModel from "./gallery.model.js";

const userModel = sequelize.define('user',
    {
        fullName : {
            type : DataTypes.STRING(100),
            allowNull : false,
            trim : true
        },

        cellPhone : {
            type : DataTypes.STRING(10),
            allowNull : false,
            unique : true
        },

        emailUser : {
            type : DataTypes.STRING(250),
            allowNull : false,
            unique : true
        },

        passwordUser : {
            type : DataTypes.STRING,
            allowNull : false
        },
        isAdmin : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        }
    }
)

//New Relationship
userModel.hasMany(newModel,{
    foreignKey : 'idUser',
    sourceKey : 'id',
    required : true
})

newModel.belongsTo(userModel,{
    foreignKey : 'idUser'
})

//Events Relationship
userModel.hasMany(eventModel,{
    foreignKey : 'idUser',
    sourceKey : 'id',
    required : true
})

eventModel.belongsTo(userModel,{
    foreignKey : 'idUser'
})

//Gallery Relationship
userModel.hasMany(galleryModel,{
    foreignKey : 'idUser',
    sourceKey : 'id',
    required : true
})

galleryModel.belongsTo(userModel,{
    foreignKey : 'idUser'
})

export default userModel