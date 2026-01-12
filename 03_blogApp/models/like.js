const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Post", // reference to the post model
    required: true,
    maxLenght: 50,
  },
  user:{
     type: String,
    required: true,
    maxLenght: 50,
  }, 
 
});

module.exports = mongoose.model("Like",likeSchema)
