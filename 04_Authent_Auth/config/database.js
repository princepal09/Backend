require('dotenv').config()
const mongoose = require("mongoose")

const dbConnect = async() =>{
   try{
         await mongoose.connect(process.env.DATABASE_URL)
         console.log("DATABASE Connected Successfully!!!")
   }catch(err){
    console.log(err);
    process.exit(1)
   }
}
module.exports = dbConnect;