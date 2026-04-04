const express = require('express'); 
const { createComment, getAllComment } = require('../controllers/commentController');
const { liking, unliking } = require('../controllers/likeContoller');
const { createPost, getPost } = require('../controllers/postController');
const router = express.Router();


router.post("/comments/create",createComment) 
router.get("/comments",getAllComment)
router.post("/likes/like",liking)
router.delete("likes/unlike",unliking)
router.post("/posts/create",createPost)
router.get("/posts",getPost)



module.exports = router;