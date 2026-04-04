const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
        required : true
    },
    body : {
        type : String,
        required : true,
        trim : true
    },
    user : {
        type : String,
        required : true,
        true : false
    }
})

module.exports = mongoose.model("Comment", commentSchema)