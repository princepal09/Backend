import nodemailer from 'nodemailer'
import { config } from '../config/config.js'

const transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS,
  },
  connectionTimeout: 5000,
})

// Verify connection (optional)
transporter.verify((error) => {
  if (error) {
    console.error("Error connecting to email server:", error)
  } else {
    console.log("Email server is ready")
  }
})

export const sendMail = async (email, title, body) => {
  try {
    const info = await transporter.sendMail({
      from: `"Prine Pal" <${config.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    })

    console.log("Message sent:", info.messageId)
    return info

  } catch (err) {
    console.error("Error Sending Mail:", err.message)
    throw err
  }
}
