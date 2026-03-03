const express = require("express")
const router = express.Router();
const {createComment, deleteComment} = require('../controllers/comment.controller')

/**
 * create comment
 */

  router.post("/create", createComment);
  
  /**
 * delete comment
 */
  router.delete("/delete", deleteComment);


module.exports = router;