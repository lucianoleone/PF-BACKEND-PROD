import nodemailer from 'nodemailer'
import ENVIROEMNT from '../config/enviroment.config.js';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENVIROEMNT.GMAIL_USERNAME,
        pass: ENVIROEMNT.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
}) 
export const sendMail = async ({to, subject, html}) => {
    try {
        const response = await transporter.sendMail({   
            to,
            subject,
            html
        })  
    }
    catch (error) {
        console.log('Error al enviar mail:',error)  
    }
}
