const express=require("express")
const router=express.Router()


const {auth, isStudent}=require("../middleware/auth")
const {
    updateprofile,
    deleteaccount,
    getalluserdetails,updatepass,updateprofilepicture,getEnrolledCcourses
}=require("../controllers/profile")

router.put("/updateprofile",auth,updateprofile)
router.delete("/deleteaccount",auth,deleteaccount)
router.get("/getuserdetails",auth,getalluserdetails)
router.put("/updatepassword",auth,updatepass)
router.put("/updateprofilepic",auth,updateprofilepicture)
router.get("/getenrollcourses",auth,getEnrolledCcourses)

module.exports=router;