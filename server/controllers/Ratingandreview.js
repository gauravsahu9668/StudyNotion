const RatingAndReviews=require("../models/RatingAndReview")

const Course=require("../models/Course")
const { default: mongoose } = require("mongoose")

// createRating
exports.createrating=async(req,res)=>{
    try{
    // get user id
    const id=req.user.id;
    // fetch user data
    const {rating,reveiws,courseid}=req.body
    // check if user is enrolled or not
    const coursedetails=await Course.findOne({_id:courseid})
    // const check = coursedetails.studentsenroll.some((id)=>{id.toString()===userid.toString()});
    
    // if(!check){
    //     return res.json({
    //         success:false,
    //         message:"student is not enrolled in the course"
    //     })
    // }
    // checking weather user already enrolled or not
    console.log("step -1")
    const alreadyexit=await RatingAndReviews.findOne({
        user:id,
        course:courseid 
    })
    console.log("step-2")
    if(alreadyexit){
        return res.json({
            success:false,
            message:"You have already added review"
        })
    }
    // create krenge rating and revies
    const ratingReview=await RatingAndReviews.create({
        user:id,
        course:courseid,
        rating:rating,
        reviews:reveiws
    })
    console.log("ye chal gya hai aisa")
    // update the rating and reviews in the course
    await Course.findByIdAndUpdate({_id:courseid},{$push:{ratingandreviews:ratingReview._id}},{new:true})
    return res.status(200).json({
        success:true,
        message:"Rating and review created successfully",
        ratingReview
    })


}catch(error){
    console.error(error)
    return res.status(500).json({
        success:false,
        message:"Error in creating rating and review"
    })
}
}

exports.getaveragerating=async(req,res)=>{
    try{
        // courseid
        const {courseid}=req.body
        // calculate the avrage rating
        const result=await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Schema.Types.ObjectId(courseid)

                },
            },
            {
             $group:{
                _id:null,
                averageRating:{$avg:"$rating"}
             }
            }
        ])
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        return res.status(200).json({
            success:true,
            message:"No rating given till now",
            averageRating:0,
        })
        
    }catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Error in getting average rating"
        })
    }
}

// get all rating handler function to see all rating
exports.getallrating=async(req,res)=>{
    try{
        const allreviews=await RatingAndReviews.find({})
        .populate("user").populate("course").exec();
        console.log(allreviews)
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allreviews
        })


    
    }catch(error){
        onsole.error(error)
        return res.status(500).json({
            success:false,
            message:"Error in getting average rating"
        })
    }
}