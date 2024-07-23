const Course=require("../models/Course");
const Category=require("../models/category");

const User=require("../models/User");
const {uploadToCloudinary}=require("../utils/imageuploader");
const { default: mongoose } = require("mongoose");
// thumbnil ayega use cloudinary 
exports.createCourse=async(req,res)=>{
    try {
        const {courseName,courseDescription,price,category,whatyouwilllearn,tag,instructions}=req.body;
const thumbnail=req.files?.thumbnailimage;
        // if(!courseName){
        //     return res.status(400).json({
        //         success:false,
        //         message:"All details are required"
        //     })
        // }
       console.log(tag)
       console.log(instructions)
         const userId=req.user.id;
        const instructordetails=await User.findById({_id:userId});
        if(!instructordetails){
            return res.status(400).json({
                success:false,
                message:"Instructor not available"
            })
        }
        console.log(category)
        const categorydetails=await Category.findById({_id:category});
        console.log(categorydetails)
        if(!categorydetails){
            return res.json({
                success:false,
                message:"Category is not available"
            })
        }
        const thumbnailurl=await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
        console.log(thumbnailurl)
        // create newcourse
        const newcourse=await Course.create({
            courseName,courseDescription,
            price,
            tag:tag,
            category:categorydetails._id,
            instructor:instructordetails._id,
            thumbnail:thumbnailurl.secure_url,
            whatyouwilllearn,instructions:instructions
        })
        console.log(newcourse)
        await User.findByIdAndUpdate({_id:instructordetails._id},
            {
                $push :{courses:newcourse._id}
            }
            ,{new:true}
        )
        await Category.findByIdAndUpdate({_id:categorydetails._id},{$push:{Course:newcourse._id}},{new:true})
        return res.status(200).json({
            success:true,
            message:"Successfully created the course",
            data:newcourse
        })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json
    }
}

// all courses
exports.showallcourses=async(req,res)=>{
    try{
        const allcourse=await Course.find({});
        return res.status(200).json({
            success:true,
            message:"all courses",
            data:allcourse
        })
    }catch(error){
        return res.status(500).json({
            success:true,
            message:"Error in finding all course"
        })
    }
}

exports.getcoursedetails=async(req,res)=>{
    try{
        const {courseId}=req.body
        console.log(courseId)
        const coursedetails=await Course.findOne({_id:courseId}).populate({
            path:"instructor",
            populate:{
                path:"additionaldetails",
            },
        })
        .populate("category")
        .populate("ratingandreviews")
        .populate({
            path:"coursecontent",
            populate:{
                path:"subsection"
            },
        }).exec();
        console.log(coursedetails)
        // validation
        if(!coursedetails){
            return res.json({
                success:false,
                message:`could not find the course with id ${courseId}`,
                data:coursedetails
            })
        }
        return res.status(200).json({
            success:true,
            message:"course details fetched successfully",
            data:coursedetails,
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Error in getting coursedetails"
        })
    }
}
exports.getInstructorCourses=async(req,res)=>{
    try{
        const email=req.user.email
        const user=await User.findOne({email}).populate("courses").exec()

        return res.json({
            success:true,
            message:"Courses fetch successfully",
            data:user.courses
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in getting all courses of instructor"
        })
    }
}
exports.publishCourse=async(req,res)=>{
    try{
        const {courseId,publish}=req.body
        if(!courseId){
            return res.json({
                success:false,
                message:"all fields are required"
            })
        }
        const updated=await Course.findByIdAndUpdate({_id:courseId},{status:publish},{new:true})
        return res.json({
            success:true,
            message:"Course published successfully"
        })
    }catch(error){
        console.log(error)
    }
}
exports.deleteCourse=async(req,res)=>{
    try{
        const {courseId}=req.body
        const deleted=await Course.findByIdAndDelete({_id:courseId})
        return res.json({
            success:true,
            message:"Course deleted Successfully"
        })
    }catch(error){
        return res.json({
            success:findAllByDisplayValue,
            message:"Error in deleting the Course"
        })
    }
}
exports.getfullcoursedetails=async(req,res)=>{
    try{

        const {courseId}=req.body
        const coursedetails=await Course.find({}).populate({
            path:"instructor",
            populate:{
                path:"additionaldetails",
            },
        })
        .populate("category")
        .populate("ratingandreviews")
        .populate({
            path:"coursecontent",
            populate:{
                path:"subsection"
            },
        }).exec();
        return res.json({
            success:true,
            message:"Course Data fetch successfully",
            data:coursedetails
        })
    }catch(error){
        return res.json({
            success:false,
            message:"Error in getting course deatils"
        })
    }
}

exports.addtocart = async (req, res) => {
    try {
        const { courseId } = req.body;
        const id = req.user.id;

        if (!courseId) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ _id: id }).populate("cart").exec();

        const cart = user.cart;
        const isAlreadyInCart = cart.some(item => item._id.toString() === courseId);

        if (isAlreadyInCart) {
            return res.json({
                success: false,
                message: "Already in Cart"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { $push: { cart: courseId } },
            { new: true }
        ).populate("cart");

        return res.json({
            success: true,
            message: "Course Added to Cart",
            data: updatedUser
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Error in getting cart details"
        });
    }
};
exports.cartdetails=async(req,res)=>{
    try{
        const id=req.user.id
        const user=await User.findOne({_id:id}).populate({
            path:"cart",
            populate:{
                path:"instructor"
            }
        }).exec()
        return res.json({
            success:true,
            message:"Cart details fetched successfully",
            data:user.cart
        })
    }catch(error){
        return res.json({
            success:false,
            message:"Error in getting course details"
        })
    }
}
exports.removerfromcart=async(req,res)=>{
    try{
        const {courseId}=req.body
        const id=req.user.id

        const updated=await User.findByIdAndUpdate({_id:id},{$pull:{cart:courseId}},{new:true}).populate({
            path:"cart",
            populate:{
                path:"instructor"
            }
        }).exec()
        return res.json({
            success :true,
            message:"Course Removed successfully",
            data:updated.cart
        })
    }catch(error){
        return res.json({
            success:false,
            message:"Error in removing fom cart"
        })
    }
}
exports.buyCourse=async(req,res)=>{
    try{
        const {courseId}=req.body
        const id=req.user.id

        if(!courseId){
            return res.json({
                success:false,
                message:"All feilds are required"
            })
        }
        const user=await User.findById({_id:id})
        const courses=user.courses
        if(courses.includes(courseId)){
            return res.json({
                success:false,
                message:"You have Already buy this course"
            })
        }

        const updateduser=await User.findByIdAndUpdate({_id:id},{$push:{courses:courseId}},{new:true})
        await Course.findByIdAndUpdate({_id:courseId},{$push:{studentsenroll:id}},{new:true})
        return res.json({
            success:true,
            message:"You successfully buy the course"
        })

    }catch(error){
        return res.json({
            success:false,
            message:"Error in buying the course"
        })
    }
}