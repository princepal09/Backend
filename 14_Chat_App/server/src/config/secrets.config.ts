import dotenv from 'dotenv'
dotenv.config();

export const PORT = process.env.PORT || 5001;
export const DB_URI = process.env.DB_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string
export const NODE_ENV = process.env.NODE_ENV as string
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string