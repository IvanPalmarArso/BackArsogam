//Token Pass
import TOKEN_SECRET from "../config.js";
//User Model
import userModel from "../model/user.model.js";
//JsonWebToken
import createAccessToken from "../libs/jwt.js";
//Hash
import bcryptjs from 'bcryptjs'
//JWT
import jwt from 'jsonwebtoken'

//Register Method
export const registerUser = async(req, res) => {
    const {fullName, cellPhone, emailUser, passwordUser} = req.body 
    
    try{
        //User Found
        const userFound = await userModel.findOne({
            where : {
                emailUser : emailUser
            }
        })

        if(userFound) return res.status(400).json({message : 'El usuario ya existe, intenta nuevamente'})

        //CellPhone Number Found
        const cellPhoneFound = await userModel.findOne({
            where : {
                cellPhone : cellPhone
            }
        })

        if(cellPhoneFound) return res.status(400).json({message : 'El número de telefono ya existe, intenta nuevamente.'})

        //Hash Password
        const passwordHash = await bcryptjs.hash(passwordUser, 8)

        //Create User
        const newUser = new userModel({
            fullName : fullName,
            cellPhone : cellPhone,  
            emailUser : emailUser,
            passwordUser : passwordHash,
            isAdmin : false
        })        

        const saveUser = await newUser.save()

        //JWT
        const token = await createAccessToken({
            id : saveUser.id,
            fullName : saveUser.fullName,
            emailUser : saveUser.emailUser,
            isAdmin : saveUser.isAdmin
        })

        res.cookie('token', token, {sameSite : 'none', secure : true, httpOnly : true})

        res.json(
            saveUser
        )

    }catch(e){
        return res.status(500).json({message : e.message})
    }

}

//Login Method
export const loginUser = async(req, res) => {
    
    const {emailUser, passwordUser} = req.body
    
    try{

        //UserFound
        const userFound = await userModel.findOne({
            where : {
                emailUser : emailUser
            }
        })

        if(!userFound) return res.status(404).json({message : 'Usuario no encontrado'})

        const passwordCompare = await bcryptjs.compare(passwordUser, userFound.passwordUser)

        if(!passwordCompare) return res.status(404).json({message : 'La contraseña es incorrecta'})

        const token = await createAccessToken({
            id : userFound.id,
            fullName : userFound.fullName,
            emailUser : userFound.emailUser,            
            isAdmin : userFound.isAdmin
        })

        res.cookie('token', token, {
            sameSite : 'none', secure : true, httpOnly : true
        })

        res.json({
            id : userFound.id,
            fullName : userFound.fullName,
            emailUser : userFound.emailUser, 
            isAdmin : userFound.isAdmin
            
        })

    }catch(e){
        return res.status(500).json({message : e.message})
    }
}

//Logout Method
export const logoutUser = (req, res) => {
    res.cookie('token','',{
        expires : new Date(0)
    })

    res.status(200).json({message : 'Has cerrado la sesión correctamente'})
}

//Add New User
export const addNewUser = async (req, res) => {
    const {fullName, cellPhone, emailUser, passwordUser} = req.body

    try{

        //UserFound
        const userFound = await userModel.findOne({
            where : {
                emailUser : emailUser
            }
        })   

        if(userFound) return res.status(400).json({message : 'El usuario ya existe, intenta nuevamente.'})

        //Phone Found
        const phoneFound = await userModel.findOne({
            where : {
                cellPhone : cellPhone
            }
        })

        if(phoneFound) return res.status(400).json({message : 'El numero de telefono ya esta registrado.'})

        //Hash password
        const passwordHash = await bcryptjs.hash(passwordUser, 8)

        //New User
        const newUser = new userModel({
            fullName : fullName,
            cellPhone : cellPhone,
            emailUser : emailUser,
            passwordUser : passwordHash,
            isAdmin : false
        })

        const saveUser = await newUser.save()

        res.status(200).json(saveUser)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

//All Users
export const allUsers = async (req, res) => {
    try{

        const allUsers = await userModel.findAll()

        res.status(200).json(allUsers)

    }catch(e){
        return res.status(500).json({message : e.message})
    }
}   

//Get One User
export const getOneUser = async(req, res) => {
    const {id} = req.params
    
    try{
        const userFound = await userModel.findByPk(id)

        if(!userFound) return res.status(404).json({message : 'Usuario no encontrado'})

        res.status(200).json(userFound)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

//Update User Method
export const updateUser = async(req, res) => {
    const {id} = req.params
    const {fullName, cellPhone, emailUser, passwordUser} = req.body

    try {   
        //User Found
        const userFound = await userModel.findByPk(id)

        if(!userFound) return res.status(404).json({message : 'Usuario no encontrado'})
        
        //Hash new password
        const passwordHash = await bcryptjs.hash(passwordUser, 8)
    
        userFound.fullName = fullName
        userFound.cellPhone = cellPhone
        userFound.emailUser = emailUser
        userFound.passwordUser = passwordHash

        await userFound.save()        

        res.status(200).json({
            userFound
        })

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

//Delete User Method
export const deleteUser = async(req, res) => {
    const {id} = req.params

    try{
        
        //UserFound
        const userFound = await userModel.findByPk(id)
        
        if(!userFound) return res.status(404).json({message : 'Usuario no encontrado'})

        await userFound.destroy()        

        res.status(201).json({message : 'El usuario ha sido eliminado correctamente'})

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

//Verify Token Method
export const verifyToken = (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message : 'Token not found'})

    jwt.verify(token, TOKEN_SECRET, async(err, user1) => {
        
        if(err) return res.status(401).json({message : 'Token Not Valid'})

        const userFound = await userModel.findOne({
            where : {
                emailUser : user1.emailUser
            }
        })

        if(!userFound) return res.status(401).json({message : 'Unauthorized'})

        return res.json({
            fullName : userFound.fullName,
            cellPhone : userFound.cellPhone,
            emailUser : userFound.emailUser,
            isAdmin : userFound.isAdmin
        })

    })
}