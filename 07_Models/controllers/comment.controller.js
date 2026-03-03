const Post = require('../models/post.model')
const Comment = require('../models/comment.model')


exports.createComment = async (req, res) => {
    try {

        const { post, body, user } = req.body;

        if (!post || !user || !body) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"

            })
        }

        const comment = await Comment.create({ post, body, user })
        await Post.findByIdAndUpdate(post, {
            $push: { "comments": comment._id }
        }, { returnDocument: "after" })


        return res.status(201).json({
            success: true,
            message: "Successfully created comment",
            comment: comment
        })

    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            error: err.message,
            message: "Internal server error"
        })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.body;

        if (!commentId) {
            return res.status(400).json({
                message: "Comment id is mandatory!",
                success: false
            })
        }

        const isCommentExists = await Comment.findById(commentId);
        const postId = isCommentExists.post;

        if (!isCommentExists) {
            return res.status(404).json({
                success: false,
                message: "Comment not exists"
            })
        }

        await Comment.findByIdAndDelete(commentId);
        await Post.findByIdAndUpdate(postId, {
            $pull: { "comments": commentId }
        }, { returnDocument: "after" })




    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            error: err.message,
            message: "Internal server error"
        })
    }
}