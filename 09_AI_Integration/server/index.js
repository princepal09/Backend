import express from 'express'
import cors from 'cors'
import { config } from './config/config.js'
const port = config.PORT
import aiRoute from './routes/ai.route.js'

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())

/**
 * Routesss 
 */

app.use("/api/v1", aiRoute)





app.listen(port, () => {
    console.log(`APP IS LISTENING AT ${port} PORT`)
})