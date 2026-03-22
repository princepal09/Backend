import { configDotenv } from "dotenv";
configDotenv();

export const config = {
     PORT : process.env.PORT,
     MONGO_URI : process.env.MONGODB_URI
}