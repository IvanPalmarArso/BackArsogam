//JWT
import jwt from 'jsonwebtoken'
//Token Secret
import dotenv from 'dotenv'
dotenv.config()

const authRequired = (req, res, next) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message : 'No tienes los permisos correspondientes'})

    jwt.verify(token, process.env.PASSWORD_TOKEN, (error, decoded) => {
        if(error) return res.status(403).json({message : 'Token invalidado'})

        req.user = decoded

        next()
    })
}

export default authRequired