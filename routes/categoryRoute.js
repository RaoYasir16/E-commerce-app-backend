const express = require("express");
const router = express.Router();

const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const { addCategory, getAllCategory, getSingleCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");

//Apply Middleware only admin can do this 
router.use(verifyToken,authorizeRole("admin"));

router.post("/add-category", addCategory);
router.get("/get-All-category",getAllCategory);
router.get("/getsingle-category/:id",getSingleCategory);
router.put("/upadate-category/:id",updateCategory);
router.delete("/delete-category/:id",deleteCategory);


module.exports = router; 
