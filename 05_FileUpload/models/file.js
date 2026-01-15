const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    filename:{
        type:String,
        required : true
    },
    tag:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    file:{
        type:String,
        required : true
    }
})

module.exports = mongoose.model("File",fileSchema);