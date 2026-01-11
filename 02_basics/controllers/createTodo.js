// Import the Model
const Todo = require("../models/Todo");

// Define Route Handler
// Always use Async/Await When we have to access in DataBase

exports.createTodo = async (req, res) => {
  try {
    // extract title and description from request body
    const { title, description } = req.body;
    // Create a New Todo obj and Insert in DB
    const response = await Todo.create({ title, description });

    // send a json response with a success flag

    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Successfull",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: err.message,
    });
  }
};
