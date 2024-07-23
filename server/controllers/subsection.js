const subSection=require("../models/SubSection");
const Section=require("../models/Section");
const {uploadToCloudinary} =require("../utils/imageuploader");
const Course=require("../models/Course")
require("dotenv").config();
exports.createsubsection=async(req,res)=>{
    try{
        console.log("yha tk shi hai")
        const { title,description,sectionId,courseId}=req.body;
        // hm apme backend me hmesha url save krte hai db me frontend pr file upload krteehia
        // esliye jo bhi media hai req.files.file se fettch kro cloudinary pr upload kro 
        // urls genrate hoga use db me daal do
        // extract video file
        const videoimage=req.files?.videofile;
       
        console.log("video bhi ban gyi hai")
        if(!title ||!description ){
            return res.json({
                success:false,
                message:"all fields are require"
            })
        }
        console.log("video upload nhi ho rhi hai")
        const uploadedvideo=await uploadToCloudinary(videoimage,process.env.FOLDER_NAME);
        console.log(uploadedvideo)
        console.log("upload bhi kr di")
        // subsection create krenge
        const subsectiondetails=await subSection.create({
            title,
            description,
            videoUrl:uploadedvideo.secure_url
        })
        console.log("ab yha a gye hai")
        const updatedsection =await Section.findByIdAndUpdate(
            {_id:sectionId},{$push:{subsection:subsectiondetails._id}},{new:true}).populate("subsection").exec();

        const coursedetails=await Course.findOne({_id:courseId}).populate({path:"coursecontent",populate:{
            path:"subsection"
        }}).exec()   
            return res.status(200).json({
                success:true,
                message:"subsection updated successfully",
                data:coursedetails
            })
    }catch(error){
        console.log(error)
        console.log("yha error a rha")
    }
}

// update subsection
exports.updatesubsection=async(req,res)=>{
    try{
        const {title,description,subsectionId}=req.body;
        if(!title|| !description  ||!subsectionId){
            return res.status(400).json({
                success:"false",
            })
        }
        const updatedsubsection=await subSection.findByIdAndUpdate({_id:subsectionId},{title:title,
            description:description},
            {new:true}
        )
        return res.status(200).json({
            success:true,
            message:"subsection is updated successfully",
            updatedsubsection
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Updateing subsection"
        })
    }
}
exports.deletesubsection=async(req,res)=>{
    try{
        const {subsectionId,courseId} =req.body;
        // validation
        if(!subsectionId || !courseId){
            return res.json({
                success:false,
                message:"error in deleteing"
            })
        }
        const deletedsubsection=await subSection.findByIdAndDelete({_id:subsectionId});
        const coursedetails=await Course.findOne({_id:courseId}).populate({path:"coursecontent",populate:{
            path:"subsection"
        }}).exec()
        return res.status(200).json({
            success:true,
            Message:"Subsection delted successfully",
            data:coursedetails
        })
    }
    catch(error){
        console.log(error)
        console.log("yha error a rha hai")
    }
}