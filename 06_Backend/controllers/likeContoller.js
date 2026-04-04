const Post = require('../models/Post')
const Like = require('../models/Like')

exports.liking = async(req, res) =>{
    try{
        const{postId, user} = req.body;
        if(!postId || !user){
            return res.status(400).json({
                success : false,
                message : "All fields are mandatory"
            })
        }

        const likingPost = await Like.create({postId, user});
        
        await Post.findByIdAndUpdate(postId, {$push : {"likes" : likingPost._id}}, {new : true});

        return res.status(200).json({
            success : true,
            message : "Like the post",
            likingPost
        })



    }catch(err){
        console.error(err.message);
        return res.status(500).json({
            success : false,
            message : "Unable to like the post"
        })
    }
}

exports.unliking = async(req, res) =>{
    try{
        const{postId} = req.body
        if(!postId){
            return res.status(400).json({
                success : false,
                message : "All fields are mandatory"
            })
        }
        
        const deletedLike = await Like.findByIdAndDelete(postId);
        await Post.findByIdAndUpdate(postId,{pull : {"likes" :deletedLike._id }}, {new : true})
        return res.status(200).json({
            success : false,
            message : "Unlike the post",
        })

        

    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Unable to unlike the post",
            error : err.message
        })
    }
}