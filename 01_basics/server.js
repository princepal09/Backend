// Step 1.  Create a folder
// Step 2.  Move into that folder
// Step 3.  npm init -y
// Step 4.  open folder using vscode
// Step 5.  npm i express
// Step 6.  Create the server.js


// Server Instantitate
const express = require('express'); // Import the express framework

const app = express(); //app is your server application 


// used to parse req.body in express ---> PUT, POST
const bodyParser = require('body-parser')

// Specefically parse JSON data and add it to the request.body object 
app.use(bodyParser.json())

app.listen(3000,() =>{
    console.log("Server Running on port 3000");
})


// Define Routes

app.get('/',(req, res) =>{
     res.send("Hello My Beautifulsssssss !!!")
})

app.post('/users',(req,res) =>{
    const {name,email} = req.body;
    console.log(name);
    console.log(email);
    res.send("User Submitted Successfully");
})

// Connection established between Express and MongoDB

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/DB')
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.error("Connection Error:", err));


//   const connectDB  = async() =>{
//     try{
//         await mongoose.connect('mongodb://localhost:2707/DB')
//         console.log("Connection successfull")
//     }catch(err){
//         console.log("Connection error");
//     }
//   }
//   connectDB();