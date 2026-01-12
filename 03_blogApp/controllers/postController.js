const Post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    // extract title, body, likes and comments from request body
    const { title, body, likes, comments } = req.body;
    const post = await Post.create({ title, body, likes, comments });

    // send a json response with a success flag

    res.status(200).json({
      success: true,
      data: post,
      message: "Post Created Successfully",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: err.message,
    });
  }
};


exports.getAllPosts = async (req, res) =>{
    try{

        const posts = await Post.find().populate("comments").populate("likes").exec();

        res.status(200).json({
            success:true,
            data : posts
        })

    }catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: err.message,
    });
  }

}
