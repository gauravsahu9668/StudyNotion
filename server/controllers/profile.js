
const Profile=require("../models/Profile")
const bcrypt=require("bcrypt")
const User=require("../models/User")
const {uploadToCloudinary}=require("../utils/imageuploader")
require("dotenv").config()
exports.updateprofile=async(req,res)=>{
    try{
        // get data
        const {firstName,lastName,gender,dateofbirth,about,contactNumber}=req.body;
        // get id 
        const id=req.user.id;
        // find profile
        if(!contactNumber || !gender || !id){
            return res.json({
                success:false,
                message:"All field are required"
            })
        }
        const userdeatails=await User.findById({_id:id})
        if(firstName!=="" && lastName!==""){
            await User.findByIdAndUpdate({_id:id},{firstName:firstName,lastName:lastName,image:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`})
        }
        const profileid=userdeatails.additionaldetails;
        const profiledetails=await Profile.findOneAndUpdate({_id:profileid},{
               gender,dateofbirth,about,contactNumber
        },{new:true})
        const userupdated=await User.findById({_id:id}).populate("additionaldetails").exec()
        profiledetails.contactNumber=undefined
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:userupdated
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in updating the profile"
        })
    }
}
exports.updatepass=async(req,res)=>{
    try{
        const {password,newpassword}=req.body
        if(!password || !newpassword){
            return res.json({
                success:false,
                message:"All feilds required"
            })
        }
        const email=req.user.email
        const user=await User.findOne({email})
        const check=await bcrypt.compare(password,user.password)
        if(!check){
            return res.json({
                success:false,
                message:"Enter correct current password"
            })
        }
        const pass= await bcrypt.hash(newpassword,10)
        const updateduser=await User.findOneAndUpdate({email},{password:pass},{new:true})
         return res.status(200).json({
            success:true,
            message:"Password updated successfully"
         })
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error in updating profile"
        })
    }
}
exports.deleteaccount=async(req,res)=>{
    try{
        // /userr ki id pta hone chahiye
        const id=req.user.id;
        // validation
        const userdetail=await User.findOne({_id:id})
        if(!userdetail){
            return res.status(404).json({
                success:false,
                message:"User not find"
            })
        }
        // user ki profile dlt krna pdega
        await Profile.findByIdAndDelete({_id:userdetail.additionaldetails})
        // user delete krna pdega
        await User.findByIdAndDelete({_id:userdetail._id})
        // todo unenroll user from courses
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Erron in deleteing the account"
        })
    }
}
exports.getalluserdetails=async(req,res)=>{
    try{
        const id=req.user.id;
        const userdet=await User.findById({_id:id}).populate("additionaldetails").exec();
        if(!userdet){
            return res.status(200).json({
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            data:userdet
        })
    }catch(error){
        return res.status(500).json({
            success:true,
            message:"Error in fetching the Data"
        })
    }
}
exports.updateprofilepicture=async(req,res)=>{
    try{
        const image=req.files.profileimage
        const uploadedimage=await uploadToCloudinary(image,process.env.FOLDER_NAME)
        const email=req.user.email
        const updateduser=await User.findOneAndUpdate({email},{image:uploadedimage.secure_url},{new:true})
        return res.json({
            sucess:true,
            message:"profile picture updated successfully",
            data:updateduser
        })
    }catch(error){
        console.log(error)
        return res.json({
            success:false,
            message:"error in updating"
        })
    }
}
exports.getEnrolledCcourses=async(req,res)=>{
    try{
        const email=req.user.email
        const userdetails=await User.findOne({email}).populate("courses").exec()
        if(!userdetails){
            return res.json({
                sucess:false,
                message:"could not find user with the given id"
            })
        }
        return  res.status(200).json({
            success:true,
            message:"successfully get enroll courses",
            data:userdetails.courses
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting courses enroll details"
        })
    }
}