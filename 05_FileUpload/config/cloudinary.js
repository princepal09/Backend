const cloudinary = require('cloudinary')
require('dotenv').config()

const connectCloudinary = () =>{
    try{
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET
        })

        console.log("CLoudinary Connection Successfull")

    } catch (err) {
    console.log(err);
    console.error("Issue in Cloudinary CONNECTION");
  }
}

module.exports = connectCloudinary;