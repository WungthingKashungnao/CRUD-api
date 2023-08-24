const express = require("express");
const mongoose = require("mongoose");
const app = express();

const db = () => {
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
};
module.exports = db;
