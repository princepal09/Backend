import express from 'express'
import contactRoute from './routes/contact.route.js'
import { cloudinaryConnect } from './utils/cloudinary/cloudinary.js'
import cors from 'cors'
import { dB } from './config/database.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors({
    origin: process.env.URL,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/contacts', contactRoute)

cloudinaryConnect()
dB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
