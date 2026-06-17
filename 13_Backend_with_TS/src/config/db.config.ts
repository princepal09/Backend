import mongoose from "mongoose";
import { MONGO_URI } from "../secrets";


export const connecDb = async():Promise<void> =>{
    try{
         await mongoose.connect(MONGO_URI);
         console.log("DB CONNECTION SUCCESFULLY!! ")
    }catch(err){
        console.log("Error connecting to DB")
        process.exit(1);
    }
}