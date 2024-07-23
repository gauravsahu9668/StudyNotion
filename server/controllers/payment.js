const { default: mongoose } = require("mongoose")
const instance=require("../config/razorpay")
const Course=require("../models/Course")
const User=require("../models/User")


const mainsender=require("../utils/mailsender")

exports.capturePayment=async(req,res)=>{
    const {courses}=req.body

    const userId=req.user.id
    if(courses.length===0){
        return res.json({
            success:"false",
            message:"Please provide course id"
        })
    }
    let totalamount=0;

    for(const course_id of courses){
        let course;
        try{
            course=await Course.findById({_id:course_id})
            if(!course){
                return res.json({
                    success:false,
                    message:"Not found any course"
                })
            }
            const uid=new mongoose.Types.ObjectId(userId)
            if(course.studentsenroll.includes(uid)){
                
            }
        }catch(error){
            console.log(error)
        }
    }
}

// capture the payment and initiate the razorpay order
// exports.capture=async(req,res)=>{
//     try{
//         // get course id and the user id
//         const {courseId}=req.body;
//         const userid=req.user.id;
//         // validation
//         if(!courseId){
//             return res.json({
//                 success:false,
//                 message:"Please provide the valid course Id"
//             })
//         }
//         // valid coursedetails from the id
//         const coursedetails=await Course.findOne({_id:courseId})
//         // validcoursedetails
//         if(!coursedetails){
//             return res.json({
//                 success:false,
//                 message:"Course not found"
//             })
//         }
//         // user ne already pay to nhi kiyahai
//         // student enrolled me check kr skta hn
//         // const uid=new mongoose.Types.ObjectId(userid)
//         if(coursedetails.studentsenroll.includes(userid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"Student is already enrolled"
//             })
//         }
//         // order create kro or return response
//         const amount=coursedetails.price
//         const currency="INR"

//         const options={
//             amount:amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:coursedetails._id,
//                 userid,
//             }
//         }
//         try{
//             const payment=await instance.orders.create(options);
//             console.log(payment)
//             return res.status(200).json({
//                 success:true,
//                 courseName:coursedetails.courseName,
//                 coursedescription:coursedetails.courseDescription,
//                 thumbnail:coursedetails.thumbnail,
//                 orderid:payment._id,
//                 currency:payment.currency,
//                 amount:payment.amount

//             })
//         }catch(err){
//             return res.status(400).json({
//                 success:false,
//                 message:"Could Not initiate the orders"
//             })
//         }
//     }catch(error){
//         console.error(error)
//         return res.status(500).json({
//             success:false,
//             message:"Error in buying the course"
//         })
//     }
// }

// exports.verifysignature=async(req,res)=>{
//         const webhooksecret="12345678"

//         // ek signature tumahar backend me pda hoga dusra signature tumahra req.ke andr header ke andr se a rha hai
//         const signature=req.headers["x-razorpay-signature"];
//         // but razorpay ne jo key bheji hogi bo encrypted hogi otherwise security breech ho jayegi n

//         // me webhooksecret ko encrypt krunga or encrypted se match kr lunga
//         // here are some process
//         // esme do cheejo ki jrurat hogi ek alogorithm ki or ek secretkey ki
//         // these three are very important process steps 
//         const shasum=crypto.createHmac("sha256",webhooksecret)
//         shasum.update(JSON.stringify(req.body));
//         const digest=shasum.digest("hex");

//         if(signature==digest){
//             console.log("payment is authorized")
//             // now i need user id and course id how to find that
//             // hmne notes ke andr userid and course id pass kiye the

//             const{courseId,userid}=req.body.payload.payment.entity.notes
//             try{
//                 const enrollcourse=await Course.findByIdAndUpdate({_id:courseId},{$push:{studentsenroll:userid}},{new:true})
//                 if(!enrollcourse){
//                     return res.status(500).json({
//                         success:false,
//                         message:"Coure not found"
//                     })
//                 }
//                 console.log(enrollcourse)
//                 // find the student and the update
//                 const enrolledstudent=await User.findByIdAndUpdate({_id:userid},{$push:{courses:courseId}},{new:true})
//                 console.log(enrolledstudent)
//                 // confirmation ka email send krna hai
//                 const emailresponse=await mainsender(
//                     enrolledstudent.email,"You have successfully esisterd","congratulations"
//                 )
//                 console.log(emailresponse)
//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature verified and course Added"
//                 })
//             }
//             catch(error){
//                 return res.status(500).json({
//                     success:false,
//                     message:error.message,
//                 })
//             }
//         }
//         else{
//             return res.status(400).json({
//                 success:false,
//                 message:"verification error"
//             })
//         }
// }