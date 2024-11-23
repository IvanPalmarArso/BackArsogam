//nodemailer
import nodemailer from 'nodemailer'
//Dotenv
import dotenv from 'dotenv'
dotenv.config()

const emailHelper = async (email, fullName, phone, request) => {

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user: process.env.EMAIL_USER,
            pass : process.env.PASS_USER
        }
    })
    
    let emailStructure = `Bienvenido al apartado de asistencia tecnica y capacitaciones, el tema de solicitud es:\n\nNombre Completo: ${fullName}\nNumero de Celular: ${phone}\n\nSolicitud: \n\n${request} \n\n\nEste es un formato de Asistencia Técnica Y Capacitaciones, por favor responde al correo para aclarar la situacion en la que se encuetra el usuario.\n\nGracias y buen dia desde el departamento de Asistencia Técnica y Capacitaciones.`

    let mailOptions = {
        from: 'Asistencia Tecnica y Capacitaciones <palmar.ivan0205@gmail.com>',
        subject : `Asistencia Tecnica y Capacitaciones - ${fullName}`,
        text : emailStructure,
        to : process.env.EMAIL_USER,
        replyTo : email == '' ? phone : email
    }    

    try{
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent ' + info.response)
        return info
    }catch(err){
        console.log('Couldn"t send the email')
        throw err;
    }
}

export default emailHelper