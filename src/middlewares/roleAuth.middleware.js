//User Model
import userModel from "../model/user.model.js";

const checkAuth = async (req, res, next) => {
    try{

        const userFound = await userModel.findByPk(req.user.id)

        if(userFound.isAdmin === true){
            next()
        }else{
            return res.status(401).json({message : 'No tienes los permisos correspondientes'})
        }

    }catch(e){
        return res.status(500).json({message : e.message})
    }
}

export default checkAuth