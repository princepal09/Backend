const cloudinary = require('cloudinary')
const File = require('../models/file')
exports.localFileUpload = async(req, res) =>{
      try{
        const {file} = req.files;
        const path = __dirname + '/files/' + Date.now() + `.${file.name.split(".")[1]}`
        file.mv(path, (err) =>{
        })
        console.log(file)

        return res.json({
            success : true,
            message : "Local File Uploaded Successfully"
        })


      }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
            error : err.message
        }
        )
      }
}  


function isFileTypeSupported(types, filetype){
  return types.includes(filetype);
}

async function uploadCloudinary(file,folder, quality){
  const options = {folder,
    resource_type : "auto",
  }
  if(quality){
    options.quality = quality;
  }

 return  await cloudinary.uploader.upload(file.tempFilePath, options)

}

// Image Upload Controller 
exports.imageUpload = async(req, res) =>{
   try{
     const{name, tags, email} = req.body
    const file = req.files.imageFile
    // console.log(file);

    // validation 
    const supportedTypes =['jpg','jpeg','png'];
    const fileType = file.name.split('.')[1].toLowerCase();
    if(!isFileTypeSupported(supportedTypes,fileType)){
      return res.status(400).json({
        success : false,
        message:"File not supported"
      })
    }
    
    // upload to cloudinary 
    const response = await uploadCloudinary(file,"Prince")
    
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl : response.secure_url

    })


    return res.status(200).json({
      sucess : true,
      data : fileData,
      message : "Successfully upload video on cloudinary"
     })


   }catch(err){
    return res.status(500).json({
      success : false,
      error : err.message,
      message : "Failed to Upload Video on Cloudinary!!! "
    })

   }

    


    

}

// Video Upload Controller 
exports.videoUpload = async(req, res) =>{
   try{
     const{name, tags, email} = req.body
    const file = req.files.videoFile
    // console.log(file);

    // validation 
    const supportedTypes = ['mov','mp4'];
    const fileType = file.name.split('.')[1].toLowerCase();
    // console.log(fileType);
    if(!isFileTypeSupported(supportedTypes, fileType)){
      return res.status(400).json({
        success : false,
        message:"File not supported"
      })
    }
    // upload to cloudinary 
    const response = await uploadCloudinary(file,"Prince")
    console.log("response")
    console.log(response)

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl : response.secure_url

    })


    return res.status(200).json({
      sucess : true,
      data : fileData,
      message : "Successfully upload video on cloudinary"
     })


   }catch(err){
    return res.status(500).json({
      success : false,
      error : err.message,
      message : "Failed to Upload video on Cloudinary!!! "
    })

   }

    

}

// Reduce Image Size Controller 
exports.imageSizeReducer = async(req, res) =>{
   try{
     const{name, tags, email} = req.body
    const file = req.files.imageFile
    // console.log(file);

    // validation 
    const supportedTypes =['jpg','jpeg','png'];
    const fileType = file.name.split('.')[1].toLowerCase();
    if(!isFileTypeSupported(supportedTypes,fileType)){
      return res.status(400).json({
        success : false,
        message:"File not supported"
      })
    }
    
    // upload to cloudinary 
    const response = await uploadCloudinary(file,"Prince",30)
    
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl : response.secure_url

    })


    return res.status(200).json({
      sucess : true,
      data : fileData,
      message : "Successfully upload video on cloudinary"
     })


   }catch(err){
    return res.status(500).json({
      success : false,
      error : err.message,
      message : "Failed to Upload Video on Cloudinary!!! "
    })

   }

    


    

}


