const express = require("express");
const dbConnect = require("./config/database");
require("dotenv").config();
const port = process.env.PORT || 3000;
const fileRoutes = require("./routes/fileRoutes");
const fileupload = require("express-fileupload");
const connectCloudinary = require("./config/cloudinary");

const app = express();
// middleware
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// mount
app.use("/api/v1", fileRoutes);

// cloudinary Connection
connectCloudinary();

// DATABASE CONNECT
dbConnect()
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(`LISTENING AT THE PORT ${port}`);
    });
  })
  .catch((err) => console.log(err));

// Start the Server
