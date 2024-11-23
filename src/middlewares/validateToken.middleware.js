//JWT
import jwt from 'jsonwebtoken'
//Token Secret
import TOKEN_SECRET from '../config'

const authRequired = (req, res, next) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message : 'No tienes los permisos correspondientes'})

    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
        if(error) return res.status(403).json({message : 'Token invalidado'})

        req.user = decoded

        next()
    })
}

export default authRequired