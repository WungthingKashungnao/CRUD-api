const express = require("express");
const {
  saveData,
  getAllData,
  getSpecificData,
  updateData,
  deleteData,
} = require("../controllers/controller.js");
// make and inport controlers in this line of code here

const router = express.Router();

// route to save data to database
router.post("/products", saveData);
// router to get all data from the databse
router.get("/products", getAllData);
// router to get data from databse with particular id
router.get("/products/:id", getSpecificData);
// router to update data in the database
router.patch("/products/:id", updateData);
// router to delete data from the database
router.delete("/products/:id", deleteData);
module.exports = router;
