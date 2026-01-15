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