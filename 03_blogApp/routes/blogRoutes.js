const express = require('express')

const router = express.Router();

// import Controller

const{createPost} = require('../controllers/createPost')

router.post('/createPost',createPost);

module.exports = router