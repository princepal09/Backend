const Post = require("../models/post");
const Comment = require('../models/comments')

exports.createComment = async (req, res) => {
  try {
    const { user, post, body } = req.body;
    const comment = new Comment({
      post,
      user,
      body,
    });

    const savedComment = await comment.save();

    // find the post by ID, add the new comments to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      data: updatedPost,
      message: "Succefully Created Comment",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error",
    });
  }
};
