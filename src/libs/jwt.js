//Token Password
import TOKEN_SECRET from '../config.js'
//Json Web Token
import json from 'jsonwebtoken'

function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        json.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn : '1d'
            },
            (err, token) => {
                if(err)reject( err)
                resolve(token)
            }
        )
    })
}

export default createAccessToken