import dotenv from 'dotenv'
dotenv.config()


export const PORT = process.env.PORT || 5000
export const HOST_URL = process.env.HOST_URL 
export const MONGO_URI = process.env.MONGO_URI as string