const express=require("express")
const router=express.Router()
const {signup,login,sendOTP}=require("../controllers/auth")
const {auth}=require("../middleware/auth")
const {resetpassword,resetPasswordToken}=require("../controllers/Resetpassword")

// ******************************************************************
// **            user ke routes                                   ***
// ******************************************************************

router.post("/signup",signup)
router.post("/sendotp",sendOTP)
router.post("/login",login)


router.post("/resetPasswordToken",resetPasswordToken)
router.put("/resetPassword",resetpassword)

module.exports=router;