import express,{Express, Request, Response} from 'express'

const app:Express = express();

app.get("/", (req : Request, res:Response)=>{
    return res.json({
        success : true,
        message : "Your server is running up..."
    })
})

export default app;