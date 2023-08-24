const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); //using dotenv so we can use env files
const dataRoutes = require("./routes/dataRoutes.js"); //routes
const app = express();
app.use(express.json()); //using express middleware so our app can understand json

// routes start
app.use("", dataRoutes);
// routes end

// starting the server and connecting to the database
mongoose
  .connect(process.env.mongo_url)
  .then(() => {
    console.log("Connected to mongoDB database");
    app.listen(3000, () => {
      console.log(`Server has started on port 3000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
