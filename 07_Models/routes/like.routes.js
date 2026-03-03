const express = require("express")
const router = express.Router();

const {like, unlike} = require('../controllers/like.controller')

/**
 * create like
 */

  router.post("/like", like);
  
  /**
 * delete like
 */
  router.delete("/unlike", unlike);


module.exports = router;