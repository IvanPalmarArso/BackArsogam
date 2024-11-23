//nodemailer
import nodemailer from 'nodemailer'
//Dotenv
import dotenv from 'dotenv'
dotenv.config()

const pqrsEmail = async(fullName, phoneUser, emailUser, kindOfRequest, requestUser) => {

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.PASS_USER
        }
    })

    let emailStructure = `Bienvenido a la sección de PQRS, aqui se responderan todo tipo de dudas e inquitudes a los usuarios.\n\n- Nombre: ${fullName}\n\n- Numero de Celular: ${phoneUser}\n\n- Tipo de PQRS: ${kindOfRequest}\n\nContextualización: ${requestUser}\n\nGracias y buen dia, se espera una pronta respuesta a la PQR enviada por el usuario ${emailUser != '' ? emailUser : phoneUser}`

    let emailOptions = {
        from : 'Petición PQRS <palmar.ivan0205@gmail.com>',
        subject : `PQRS - ${fullName}`,
        text : emailStructure,
        to : process.env.EMAIL_USER,
        replyTo : emailUser != '' ? emailUser : phoneUser
    }

    try{

        const info = await transporter.sendMail(emailOptions)
        console.log('Email sent' + info.response)
        return info

    }catch(err){
        console.log('Couldn"t send the email')
        throw err
    }

}

export default pqrsEmail