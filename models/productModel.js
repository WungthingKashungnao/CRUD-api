const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  //timestamp is used to track when data is created and modified
  {
    timestamps: true,
  }
);

// Product is the name of the model which will atutomatically be converted to product
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
