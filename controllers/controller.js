const productModel = require("../models/productModel.js");

// save data to database
const saveData = async (req, res) => {
  try {
    const product = await productModel.create(req.body); // saving or creating a new product in the database, which came from the body request
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// get all data from database
const getAllData = async (req, res) => {
  try {
    const product = await productModel.find({}); //getting all data from the data base
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// get data from database with particular id
const getSpecificData = async (req, res) => {
  try {
    const { id } = req.params; //getting id from url
    const product = await productModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// update data in the database
const updateData = async (req, res) => {
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
};

// delete product from the database
const deleteData = async (req, res) => {
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
};

module.exports = {
  saveData,
  getAllData,
  getSpecificData,
  updateData,
  deleteData,
};
