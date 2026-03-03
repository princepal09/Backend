const Like = require('../models/like.model')
const Post = require('../models/post.model')


exports.like = async (req, res) => {
    try {

        const { post, user } = req.body;

        if (!post || !user) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"

            })
        }

        const like = await Like.create({ post, user })
        await Post.findByIdAndUpdate(post, {
            $push: { "likes": like._id }
        }, { returnDocument: "after"  })

        return res.status(201).json({
            success: true,
            message: "Successfully liked",
            like: like
        })

    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            error : err.message,
            message: "Internal server error"
        })
    }
}

exports.unlike = async(req, res) =>{
    try{
        const {likeId} = req.body;
        if(!likeId){
            return res.status(400).json({
                success : false,
                message : "Id is mandatory"
            })
        }

        const isLiked = await Like.findById(likeId);
        const postId = isLiked.post;

        if(!isLiked){
            return  res.status(400).json({
                success : false,
                message : "Post is not liked"
            })
        }
        
        await Like.findByIdAndDelete(likeId);

        await Post.findByIdAndUpdate(postId, {
            $pull :{"likes" : likeId}
        }, {returnDocument: "after" })

        return res.status(200).json({
            success : true,
            message : "Unliked successfully"
        })

        

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            error : err.message,
            message: "Internal server error"
        })
    }
}