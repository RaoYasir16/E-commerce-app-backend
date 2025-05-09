const express = require("express");
const router = express.Router();

const {verifyToken,authorizeRole}= require("../middlewares/authMiddleware");


const {addToCart, viewAllCart, removeCart, showAllCart} = require("../controllers/cartController")

//Add to cart 
router.post("/add-to-cart",verifyToken,authorizeRole("user"),addToCart);

//View all cart
router.get("/view-cart",verifyToken,authorizeRole("user"),viewAllCart)

//Remove form cart
router.delete("/remove-cart/:id",verifyToken,authorizeRole("user"),removeCart)

//Show All cart with User & product Details on admin deshboard
router.get("/all-carts",verifyToken,authorizeRole("admin"),showAllCart)

module.exports = router