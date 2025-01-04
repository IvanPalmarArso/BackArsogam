//Sequelize ORM
import sequelize from '../db.js'
import {DataTypes} from 'sequelize'

const infoModel = sequelize.define('info',{
    infoVideo : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

export default infoModel