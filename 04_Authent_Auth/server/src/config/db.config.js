import mongoose from 'mongoose'
import { MONGO_URI } from './secrets.config.js';

export const dbConn = async() =>{
  try{
    await mongoose.connect(MONGO_URI);
    console.log("DB CONNECTION SUCCESSFULLY!!!");

  }catch(err){
    console.log("ERROR in DB Connection!!", err);
    process.exit(1);
  }
}