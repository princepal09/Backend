import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const dB = async () =>{
    try{
       await mongoose.connect(process.env.DB_URI)
       console.log("DATABASE CONNECTION SUCCESSFULLY !!!")
    }catch(err){
        console.log(err.message)
    }
}