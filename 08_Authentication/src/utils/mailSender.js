import nodemailer from 'nodemailer'
import {config} from '../config/config.js'

const transporter = nodemailer.createTransport({
      host: config.MAIL_HOST,
      port: 587, // important
      secure: false, // true only for 465
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS,
      }
})
    
// Verify the connection configuration

transporter.verify((error, success) =>{
   if(error){
    console.error("Error connecting to email server:", error);
   }else{
    console.log("Email server is ready to send messages");
   }
})


const sendMail = async(to, subject, text, html) =>{
    try{
        const info = await transporter.sendMail({
            from : `Prine Pal || ${config.MAIL_HOST}`,
            to,
            subject,
            text,
            html
        })  

        console.log(info);


    }catch(err){
        console.error("Error Sending Mails", err.message)
    }
}

