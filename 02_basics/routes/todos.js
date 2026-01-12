const express = require('express')
const router  = express.Router();

// import controller

const {createTodo} = require('../controllers/createTodo')
const {getTodos,getTodoById} = require('../controllers/getTodos')
const {updateTodobyId} = require('../controllers/updateTodo')
const {deleteTodo} = require('../controllers/deleteTodo')

// define API Routes
router.post('/createTodo',createTodo);
router.get('/getTodos',getTodos);
router.get('/getTodos/:id',getTodoById);
router.put('/updateTodo/:id',updateTodobyId)
router.delete('/deleteTodo/:id',deleteTodo)

module.exports = router; 