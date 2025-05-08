const{addUser , veryfiyEmail,loginUser,
    forgetPassword, resetPassword}
    = require("../controllers/userController")
    
const express= require("express");
const router  = express.Router();

//User Register
router.post("/add-user",addUser);
// Verify email
router.get("/verify-email/:token",veryfiyEmail)
//User Login
router.post("/login",loginUser);
//Send maile for Forget Password
router.post("/forget-password",forgetPassword)

router.post("/reset-password/:token",resetPassword);

module.exports = router 