const Post = require('../models/post')
const Comment = require('../models/comments')

exports.createComment = async(req, res) =>{
  try{
    const {commentBody, user, post} = req.body
     // check the title and body is empty or not
    if (!commentBody || !user || !post) {
      return res.status(404).json({
        success: false,
        message: "All Fields Required!!",
      });
    }

    // create Comment 
    const comment = new Comment ({commentBody, user, post})
    const savedComment = await comment.save();
    
    const updatedPost = await Post.findByIdAndUpdate(post, {$push:{comments : savedComment._id }},{new:true}).populate("comments").exec();
                       

    return res.status(201).json({
      success : true,
      message : "Your Comment has created",
      comment : savedComment
    })


  }catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error : err.message
    });
  }

}