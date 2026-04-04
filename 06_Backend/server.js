const express = require("express");
const app = express();
require("dotenv").config();
const { dbConnect } = require("./config/database");
const PORT = process.env.PORT || 4000;


app.use(express.json());

// api routes 
const demoRoutes = require('./routes/demoRoutes')
app.use('/api/v1',demoRoutes);

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
