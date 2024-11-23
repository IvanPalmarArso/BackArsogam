//Token Password
import dotenv from 'dotenv'
//Json Web Token
import json from 'jsonwebtoken'
dotenv.config()

function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        json.sign(
            payload,
            process.env.PASSWORD_TOKEN,
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