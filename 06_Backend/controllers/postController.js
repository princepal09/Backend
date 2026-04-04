const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "OOPs please fill all the fields",
      });
    }

    const createPost = await Post.create({ title, content })

    return res.status(201).json({
      success: true,
      message: "Post successfully created !!!",
      data: createPost
    });

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Cannot Create Post",
      err: err.message
    });
  }
};


exports.getPost = async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate({
      path: "likes",
      select: "user"
    }).populate({
      path: "comments",
      select: "body user"
    })
    if (!allPosts) {
      return res.status(404).json({
        success: false,
        message: "Unable to get all the posts"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Successfully run the roue",
      Posts: allPosts
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to get the posts",
      error: err.message
    })
  }
}