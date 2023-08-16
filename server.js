const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); //using dotenv so we can use env files
const productModel = require("./models/productModel"); //importing product model

const app = express();

app.use(express.json()); //using express middleware so our app can understand json

// routes start
app.get("/", (req, res) => {
  res.send("Welcome to home page");
});
app.get("/blog", (req, res) => {
  res.send("Welcome to blog page");
});
// save data to database
app.post("/products", async (req, res) => {
  try {
    const product = await productModel.create(req.body); // saving or creating a new product in the database, which came from the body request
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// get all data from database
app.get("/products", async (req, res) => {
  try {
    const product = await productModel.find({}); //getting all data from the data base
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// get data from database with particular id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; //getting id from url
    const product = await productModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// update data in the database
app.patch("/products/:id", async (req, res) => {
  const { id } = req.params; //getting data from the database

  try {
    const product = await productModel.findByIdAndUpdate(id, req.body);
    // if we do not find matching products run the code inside the if block
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find product with id: ${id}` });
    }
    const updatedProduct = await productModel.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// delete product from the database
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params; //destructuring id from the url
  try {
    const product = await productModel.findByIdAndDelete(id);
    // if no products are found
    if (!product) {
      res.status(404).json({ message: `no product found with id: ${id}]` });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// routes end

//firstly connecting to databse then starting the server
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
