const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB Connection Successfull!!!");
  } catch (err) {
    console.log(err);
    console.error("Issue in DATABASE CONNECTION");
  }
};

module.exports = dbConnect;