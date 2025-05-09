const express = require("express");
const router = express.Router();

const {verifyToken,authorizeRole}= require("../middlewares/authMiddleware");
const { placeOrder, myOrder, showAllOrders, } = require("../controllers/orderController");

//user can place order
router.post("/place-order",verifyToken,authorizeRole("user"),placeOrder);
//User can see our orders
router.get("/my-order",verifyToken,authorizeRole("user"),myOrder)

//Only admin can see all order
router.get("/all-order",verifyToken,authorizeRole("admin"),showAllOrders)


module.exports = router