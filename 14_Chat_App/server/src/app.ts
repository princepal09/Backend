import express, {Request, Express, Response} from 'express'
import cookiParser from 'cookie-parser'
import cors from 'cors'
const app:Express =  express()
import authRoutes from './routes/auth.route.js'


app.use(express.json());
app.use(cookiParser());
app.use(cors({
    origin : ['http://localhost:5000'],
    credentials : true
}))


//routes

app.use("/api/v1/auth", authRoutes)

app.get('/', (req:Request, res:Response) => {
    return res.json({
        success :true,
        message :"Your server is running up..."
    })
})

export default app;