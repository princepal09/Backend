const express = require('express')
const app = express();

// laod config from env file
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// MiddleWare to parse json Request Body
app.use(express.json());

// import routes from todo API
const todoRoutes = require('./routes/todos')


// Mount the Todo API routes
app.use("/api/v1",todoRoutes)

// start server

app.listen(PORT,()=>{
    console.log(`Sever Start Successfully at ${PORT}`);
})

// Connect to the DATABASE
const dbConnect = require('./config/database')
dbConnect();

//default Route

app.get('/',(req,res) =>{
    res.send(`<h1> This is for You Babyyy!!!!</h1>`)
})