const express=require("express")
const multer=require("multer")
const upload=multer()
const {createCourse,removerfromcart,buyCourse,cartdetails,addtocart,showallcourses,getcoursedetails,getInstructorCourses,publishCourse,deleteCourse,getfullcoursedetails}=require("../controllers/Course")
const {createsesction,updatesection,deletesection}=require("../controllers/Section")
const {createsubsection,updatesubsection,deletesubsection}=require("../controllers/subsection")
const{auth,isInstructor, isStudent}=require("../middleware/auth")

const {createrating,getaveragerating,getallrating}=require("../controllers/Ratingandreview")


const {createcategory,showallcategory,cetegorypagedetails}=require("../controllers/Category")
const router=express.Router()
router.post("/createCourse",auth,createCourse)
router.get("/showallCourses",auth,showallcourses)
router.get("/getCourseDetails",auth,getcoursedetails)
router.get("/getallinstructorcourses",auth,isInstructor,getInstructorCourses)
router.delete("/deleteCourse",auth,isInstructor,deleteCourse)
router.get("/getfullcoursedetils",auth,isStudent,getfullcoursedetails)

// section ke path ko krna pdega
router.post("/createSection",auth,createsesction)
router.put("/updateSection",auth,isInstructor,updatesection)
router.delete("/deleteSection",auth,isInstructor,deletesection)

// subsection bale likhna hai ab
router.post("/createSubsection",auth,isInstructor,createsubsection)
router.put("/updateSubsection",auth,isInstructor,updatesubsection)
router.delete("/deleteSubsection",auth,isInstructor,deletesubsection)

router.post("/publishCourse",auth,isInstructor,publishCourse)
// rating and reviews
router.post("/createRating",auth,isStudent,createrating)
router.get("/getAverageRating",getaveragerating)
router.get("/getReviews",getallrating)
// add to cart bala
router.put("/addtocart",auth,isStudent,addtocart)
router.get("/cartdetails",auth,isStudent,cartdetails)
router.put("/removefromcart",auth,isStudent,removerfromcart)
// category bala section
router.post("/createCategory",createcategory)
router.get("/showallCategory",showallcategory)
router.get("/cetegoryPageDetails",cetegorypagedetails)
// buy krna hai
router.put("/buycourse",auth,isStudent,buyCourse)
module.exports=router;