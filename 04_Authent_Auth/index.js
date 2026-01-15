const express = require('express');
const app = express();
const dbConnect = require('./config/database')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const port  = process.env.PORT || 3000;


// parse json body
app.use(express.json());

// parse cookies 
app.use(cookieParser())

// mount the routes
app.use("/api/v1",userRoutes)


// DB CALL
dbConnect();

// Server Start
app.listen(port, () =>{
    console.log(`APP IS LISTENING AT PORT ${port}`)
})  
