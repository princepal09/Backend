const mongoose = require("mongoose")
require("dotenv").config();

exports.connectDb = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to the database successfully");

    }catch(err){
        console.log(err);
        console.log("Error connecting to the database");
    }
}

