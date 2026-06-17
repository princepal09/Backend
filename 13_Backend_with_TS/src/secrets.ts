import dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'
dotenv.config()


export const PORT = process.env.PORT || 5000
export const HOST_URL = process.env.HOST_URL 
export const MONGO_URI = process.env.MONGO_URI as string
export const JWT_SECRET = process.env.JWT_SECRET as Secret