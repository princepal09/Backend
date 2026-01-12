const Post = require("../models/post");
const Like = require("../models/like");

// Like Post
exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const likePost = await Like.create({
      post,
      user,
    });

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: likePost._id } },
      { new: true }
    ).populate("likes") .exec();
    res.json({  
        success : true,
      data: updatedPost,
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Error While Liking Post",
    });
  }
};

// Unlike Post
exports.unlikePost = async (req, res) => {
  try {

    const {post, like} = req.body;
    // find and delete the like in collection 

    const deletedLike = await Like.findOneAndDelete({post:post, _id:like})


    // update the post collection 
    const updatedPost = await Post.findByIdAndUpdate(post,{$pull :{likes:deletedLike._id}}, {new : true})

    res.json({
        success : true, 
        post:updatedPost
    })



  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Error while Unliking Post",
    });
  }
};
