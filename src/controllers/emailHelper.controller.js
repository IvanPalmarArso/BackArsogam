//Email helper
import emailHelper from "../middlewares/emailHelper.middleware.js";

//Send email
const sendEmail = async (req, res) => {
    const {emailUser, fullName, phoneUser, requestUser} = req.body;

    try{                    

        const response = await emailHelper(emailUser,fullName, phoneUser, requestUser)
        res.status(200).json(response)

    }catch(error){
       
        res.status(500).send({message : 'Error sending email'})
        throw error        
    }
}

export default sendEmail