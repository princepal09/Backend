const Todo = require('../models/Todo')

exports.deleteTodo = async (req, res) =>{
     try{
    
            const {id} = req.params
            const deletedTodo = await Todo.findByIdAndDelete(id)
    
            res.status(200).json({
                success : true,
                data : deletedTodo,
                message : `Todo ${id} Successfully Deleted`
    
            })
    
    
          }catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          data: "Internal Server Error",
          message: err.message,
        });
      }
}