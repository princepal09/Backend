const Post = require('../models/Post')
const Comment = require('../models/Comment')

exports.createComment = async(req, res) =>{
   try{
    const {body, user, postId} = req.body;
    if(!body || !user || !postId){
        return res.status(400).json({
            success : false,
            message : "All fields are mandatory"
        })  
    }

    const comment = await Comment.create({body, user, postId})
    
    const updatedPost = await Post.findByIdAndUpdate(postId, {$push : {"comments" : comment._id}}, {new : true})

    return res.status(201).json({
        success : true,
        message : "Comment created successfully",
        comment : comment
    })



   }catch(err){
    console.log(err.message)
    return res.status(500).json({
        success : false,
        message : "Unable to create comment",
        err : err.message
    })

   }
}



exports.getAllComment = async(req, res) =>{
    try{
        const allcomments = await Comment.find({})
        if(!allcomments){
            return res.status(404).json({
                success : false,
                message : "There is not comment for this post"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Successfully fetched all comments",
            allcomments
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            success : false,
            message : "Unable to get comments"
        })
    }
}