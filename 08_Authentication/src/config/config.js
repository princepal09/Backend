import { configDotenv } from "dotenv";
configDotenv();

export const config = {
     PORT : process.env.PORT,
     MONGO_URI : process.env.MONGODB_URI,
     MAIL_PASS : process.env.MAIL_PASS,
     MAIL_HOST : process.env.MAIL_HOST,
     MAIL_USER : process.env.MAIL_USER,
     JWT_SECRET : process.env.JWT_SECRET_KEY
}