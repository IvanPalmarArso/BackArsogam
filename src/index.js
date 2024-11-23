//App
import app from "./app.js";
//Sequelize
import sequelize from "./db.js";
//DotEnv
import dotenv from 'dotenv'
dotenv.config()

async function mainRun(){
    try{
        await sequelize.sync({force : false})
        app.listen(process.env.SERVER_PORT || 3000, () => {            
            console.log("Server running on port " + process.env.SERVER_PORT || 3000)
        })

    }catch(error){
        console.log('Server is not running!')
    }
}

mainRun()