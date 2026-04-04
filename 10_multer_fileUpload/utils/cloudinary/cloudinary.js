import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

export const cloudinarConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
        })
        console.log("Cloudinary connected successfully")
    } catch (err) {
        console.log("Cloudinary connection error:", err.message)
    }
}

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("File path is missing");

        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "contactForms",
        })

        console.log("File has been uploaded successfully")
        fs.unlinkSync(localFilePath);
        console.log(response);
        return response;

    } catch (err) {
        console.log(err.message)
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed

        return null;
    }
}