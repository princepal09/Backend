import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDb = async() =>{
    try{
        await mongoose.connect(config.MONGO_URI)
        console.log("DATABASE CONNECTION SUCCESSFULLY !!")

    }catch(err){
        console.error("DB error:", err.message)
        process.exit(1);
    }
}



