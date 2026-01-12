const Todo = require("../models/Todo");

// define route handler

exports.getTodos = async (req, res) => {
  try {
    // fetch all todos from DATABASE

    const todos = await Todo.find({});

    // response
    res.status(200).json({
      success: true,
      data: todos,
      message: "Entire Todo Data is fetched",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "server error",
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });

    res.status(200).json({
      success: true,
      data: todo,
      message: "Todo is fetched",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: err.message,
    });
  }
};
