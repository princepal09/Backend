const express = require('express')

const router = express.Router();

// import Controller

const{createPost, getAllPosts} = require('../controllers/postController')
const{createComment} = require("../controllers/commentController") 
const {dummyRoute} = require("../controllers/dummyController")
const {likePost, unlikePost} = require("../controllers/likeController")

router.post('/posts/create',createPost);
router.get('/posts',getAllPosts)
router.post('/comments/create',createComment)
router.get('/dummyRoute',dummyRoute)
router.post('/likes/like',likePost)
router.post('/likes/unlike',unlikePost)

module.exports = router