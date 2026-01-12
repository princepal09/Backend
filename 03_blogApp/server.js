const express = require("express");
const app = express();

require("dotenv").config();

const Port = process.PORT || 4000;

//middleware to parse json request body
app.use(express.json());

//import routes from routes
const blogRoutes = require("./routes/blogRoutes");

// mount the blog api routes

app.use("/api/v1", blogRoutes);

// start server
app.listen(Port, () => {
  console.log("Server Started");
});

// connect to DB
const dbConnect = require("./config/database");
dbConnect();

// default route
app.get('/',(req,res)=>{
    res.send("Hey BABBBY ")
})