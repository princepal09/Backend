const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("Server Running on 3000");
});

app.get("/", (req, res) => {
  res.send("heYyy beautiFUlssssssssssssss");
});

// used to parse req.body in express ---> PUT, POST
const bodyParser = require("body-parser");

// Specefically parse JSON data and add it to the request.body object
app.use(bodyParser.json());

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  console.log(name);
  console.log(email);
  res.send("User Submitted Successfully");
});

const mongoose = require("mongoose");

const dB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/DB");
    console.log("Connection Successful");
  } catch (err) {
    console.log("Connection Error");
  }
};

dB();
