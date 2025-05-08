const express = require("express");
const router = express.Router();

//imaport Middlewares
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware")
const upload = require("../middlewares/upload")

// Import Controllers
const { AddPorduct, getAllProducts, getSingleProduct,getProducts, updateProduct,deleteProduct } = require("../controllers/productController");


// Apply Middleware only admin can access these routes
router.use(verifyToken,authorizeRole("admin"));

//Add Products
router.post("/add-product/:id",upload.single("image"),AddPorduct);

// Fatch All Products against Category
router.get("/get-products/:id",getAllProducts);

// Fatch A single Porduct
router.get("/get-product/:id",getSingleProduct);

//Fatch all Porducts 
router.get("/all-products",getProducts);

//Update Product 
router.put("/update-product/:id",upload.single("image"),updateProduct);

//Delete Product
router.delete("/delete-product/:id",deleteProduct)

module.exports = router