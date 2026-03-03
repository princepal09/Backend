const express = require("express")
const router = express.Router();
const { createPost, deletePost, getAllPost } = require('../controllers/post.controller')


/**
 * create Post
 */

router.post("/create", createPost)

/**
 * delete Post
 */
router.delete("/delete", deletePost)

/**
 * get all Post
 */
router.post("/allPost", getAllPost)


module.exports = router;