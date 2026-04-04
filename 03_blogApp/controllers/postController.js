const Post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    // data fetch from request body
    const { title, body } = req.body;

    // check the title and body is empty or not
    if (!title || !body) {
      return res.status(404).json({
        success: false,
        message: "All Fields Required!!",
      });
    }
    // Create Post
    const post = await Post.create({ title, body });

    // Return res

    return res.status(201).json({
      success: true,
      message: "Created a Post",
      post: post,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.getPost = async (req, res) => {
  try {
  
    const {id} = req.params
    const post = await Post.findById(id)

    if(!post){
      return res.status(404).json({
        success : false,
        message : "Post Not Found"
      })
    }

    // Return res
    return res.status(200).json({
      success: true,
      message: " Post Fetched successfully",
       post,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
  
    const post = await Post.find().populate("likes").populate("comments").exec();

    // Return res
    return res.status(201).json({
      success: true,
      message: "Fetched all post successfully",
      post: post,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
