//PQR helper
import pqrsEmail from "../middlewares/pqrsHelper.middleware.js";

//sendPQR
export const sendPQR = async (req, res) => {
    const {fullName, phoneUser, emailUser, kindOfRequest, requestUser} = req.body

    try{

        const sendEmailPqr = await pqrsEmail(fullName, phoneUser, emailUser, kindOfRequest, requestUser)
        res.status(200).json(sendEmailPqr)

    }catch(error){
        res.status(500).send({message : 'Error sending the PQR'})
        throw error
    }
}