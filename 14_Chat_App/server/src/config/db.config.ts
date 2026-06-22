import mongoose from "mongoose";
import { DB_URI } from "./secrets.config.js";


export const dbConnect = async() =>{
    try{
        const conn = await mongoose.connect(DB_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`)

    }catch(err){
        console.error('MongoDB connection failed', err);
        process.exit(1);
    }
}