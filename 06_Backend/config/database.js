const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DATABASE CONNECTION SUCCESSFULLY !!!");
  } catch (err) {
    console.log("Failed to connect Database !!");
    console.error(err.message);
    process.exit(1);
  }
};
