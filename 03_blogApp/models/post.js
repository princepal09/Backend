const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true,
        maxLength : 50
    },
    body:{
        type : String,
        required : true,
        maxLength : 500

    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
         type : String,
        required : true,
        maxLength : 100

    }
})

module.exports = mongoose.model("Post", postSchema)