const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connection Successfull");
  } catch (err) {
    console.log("Issue in DB Connection");
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = dbConnect;