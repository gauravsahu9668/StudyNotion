const Section=require("../models/Section");
const Course=require("../models/Course");

// jab bhi hm section create krenge to jisme bhi section create krenge
// us course ki id req me deni hogi smiliar for subsection
exports.createsesction=async(req,res)=>{
    try{
        // data fetch
        const {sectionName,courseId}=req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                massage:"please fill all the details"
            })
        }
        // section create kr liya 
        const newsection=await Section.create({sectionName});
        // update krna pdega mujhe course
        const updatedcourse=await Course.findByIdAndUpdate({_id:courseId},{$push :{coursecontent:newsection._id}},{new:true}).populate("coursecontent").exec()
        // return section
        // how to use populate to section and subsection both
        return res.status(200).json({
            success:true,
            message:'section creted successfully',
            data:updatedcourse
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:ture,
            message:"Unable to create section ,please try again"
        })
    }
}

exports.updatesection=async(req,res)=>{
    try{
        // data input
        const {sectionName,sectionId}=req.body;
        // validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                massage:"please fill all the details"
            })
        }
        // update krna chahta hn
        const updatedsection =await Section.findByIdAndUpdate({_id:sectionId},{sectionName:sectionName},{new:true})
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:updatedsection
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in updating"
        })
    }
}

exports.deletesection=async(req,res)=>{
    try{
        // get id
        // /params me se section id ko nikal liya hai
        const {sectionId,courseId}=req.body;
        const deletedsection=await Section.findByIdAndDelete({_id:sectionId})
        // Todo:kya section delete krne pr bo course ke coursecontent me se bhi dlt ho jayega
        const updatedcourse=await Course.findOne({_id:courseId}).populate("coursecontent").exec()
        return res.status(200).json({
            success:true,
            message:"Section deleted successully",
            data:updatedcourse
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in deleting the section"
        })
    }
}