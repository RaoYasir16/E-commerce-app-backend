const express = require("express");
const router = express.Router();

const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload")

const { AddPorduct, getAllProducts, getSingleProduct,getProducts, updateProduct,deleteProduct } = require("../controllers/productController");

//Add Products
router.post("/add-product/:id",verifyToken,authorizeRole("admin"),upload.single("image"),AddPorduct);

// Fatch All Products against Category
router.get("/get-products/:id",verifyToken,authorizeRole("admin"),getAllProducts);

// Fatch A single Porduct
router.get("/get-product/:id",verifyToken,authorizeRole("admin"),getSingleProduct);

//Fatch all Porducts 
router.get("/all-products",verifyToken,getProducts);

//Update Product 
router.put("/update-product/:id",verifyToken,authorizeRole("admin"),upload.single("image"),updateProduct);

//Delete Product
router.delete("/delete-product/:id",verifyToken,authorizeRole("admin"),deleteProduct)

module.exports = router