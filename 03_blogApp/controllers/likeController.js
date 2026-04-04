const Like = require("../models/like");
const Post = require("../models/post");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    const savedLike = await Like.create({ post, user });

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true },
    )
      .populate("likes")
      .exec();

    return res.status(201).json({
      status: true,
      message: "Liked",
      likes: updatedPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true },
    );

    return res.status(201).json({
      status: true,
      message: "Unliked",
      likes: updatedPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
