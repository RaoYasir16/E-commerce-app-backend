const express = require("express");
const router = express.Router();

const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const { addCategory, getAllCategory, getSingleCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");

//Add category only admin
router.post("/add-category",verifyToken,authorizeRole("admin"), addCategory);

//get all category admin and user both
router.get("/get-All-category",verifyToken,getAllCategory);

//get single category only admin
router.get("/getsingle-category/:id",verifyToken,authorizeRole("admin"),getSingleCategory);

//update category only admin
router.put("/upadate-category/:id",verifyToken,authorizeRole("admin"),updateCategory);

//delete category only admin
router.delete("/delete-category/:id",verifyToken,authorizeRole("admin"),deleteCategory);


module.exports = router; 
