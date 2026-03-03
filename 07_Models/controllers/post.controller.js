const Post = require('../models/post.model')
const User = require('../models/user.model')


exports.createPost = async (req, res) => {
    try {

        const { title, description, user } = req.body;

        if (!title || !description || !user) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"

            })
        }

        const post = await Post.create({ title, description, user })

        await User.findByIdAndUpdate(user, {
            $push: { "post": post._id }
        }, { returnDocument: "after"  })

        return res.status(201).json({
            success: true,
            message: "Successfully creatd post",
            post: post
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


exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.body;
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Can't  deleted the user",
            })
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: true,
                message: "Post Not found"
            })
        }

        const userId = post.user;

        // Delete the post 
        await Post.findByIdAndDelete(postId);

        await User.findByIdAndUpdate(userId, {
            $pull: {
                "post": postId
            }
        }, { returnDocument: "after" })

        return res.status(200).json({
            success: true,
            message: "Post Deleted Successfully!"
        })



    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            error: err.message,
            message: "Internal server error"
        })
    }
}

exports.getAllPost = async (req, res) => {
    try {

        const posts = await Post.find({});

        if(!posts){
            return res.status(404).json({
                success : false,
                message : "Posts doesn't exists"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Successfully fetched all post",
            posts: posts
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            error: err.message,
            message: "Internal server error"
        })
    }
}