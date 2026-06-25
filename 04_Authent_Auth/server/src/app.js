import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoute from "./routes/auth.route.js";
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : ['http://localhost:3002'],
    credentials : true
}))


// routed
app.use("/api/v1/auth", authRoute);


app.get("/", (req, res) =>{
    return res.json({
        success : true,
        message : "Your Server is running up..."
    })

})

export default app;