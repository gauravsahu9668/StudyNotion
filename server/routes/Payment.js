const express=require("express")

const router=express.Router()
const {capture,verifysignature}=require("../controllers/payment");
const { auth,isStudent } = require("../middleware/auth");

router.post("/capturePayment",auth,isStudent,capture)
router.post("/verifySignature",verifysignature)

module.exports=router;