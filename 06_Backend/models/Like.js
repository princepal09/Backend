const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    },
    user : {
        type : String,
        required : true,
        trim : true
    }

})

module.exports = mongoose.model("Like",likeSchema)