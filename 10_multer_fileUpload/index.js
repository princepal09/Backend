import express from 'express'
import contactRoute from './routes/contact.route.js'
import { cloudinarConnect } from './utils/cloudinary/cloudinary.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/contacts', contactRoute)

cloudinarConnect()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
