const express = require("express");
const router = express.Router();

const {verifyToken,authorizeRole}= require("../middlewares/authMiddleware");


const {addToCart, viewAllCart, removeCart} = require("../controllers/cartController")

//Add to cart 
router.post("/add-to-cart",verifyToken,authorizeRole("user"),addToCart);

//View all cart
router.get("/view-cart",verifyToken,authorizeRole("user"),viewAllCart)

//Remove form cart
router.delete("/remove-cart/:id",verifyToken,authorizeRole("user"),removeCart)

module.exports = router