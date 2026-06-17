import express, {Express, Request, Response} from 'express'
import cors from 'cors'
import { HOST_URL } from './secrets';
import routes from './routes/index.route';
const app:Express = express();


app.use(cors({
    origin : HOST_URL || '*'
}))

app.use("/api/v1",routes)




app.get('/', (req: Request, res: Response) => {
    return res.json({
        status : true,
        message : "Your server is running up..."
    })
})

export default app;