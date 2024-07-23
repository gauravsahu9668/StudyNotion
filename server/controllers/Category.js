

const { default: mongoose } = require("mongoose");
const Category=require("../models/category");
// create tag ka handler function likhna hai
exports.createcategory=async(req,res)=>{
    try{
        // fetch data
        const {name,description}=req.body;
        // validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }
        // create entry
        const createcategory=await Category.create({name,description});
        console.log(createcategory);
        return res.status(200).json({
            success:true,
            message:"Create tag successfully",
            data:createcategory
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Erron in creatimg the tag"
        })
    }
}

// getalltags
exports.showallcategory=async(req,res)=>{
    try{
        const allcategory=await Category.find({},{
            // esko n bhi likhenge to chlega
            name:true,
            description:true,
        });
        return res.status(200).json({
            success:true,
            message:"All category return successfully",
            data:allcategory
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Erron in showing the tag"
        })
    }
}
const Mongoose=require("mongoose")
exports.cetegorypagedetails=async(req,res)=>{
    try{
        const {categoryId}=req.body;
        const categorydetails=await Category.find({}).populate({path:"Course",populate:{path:"instructor"}}).exec()
        console.log(categorydetails)
        if(!categorydetails){
            return res.json({
                success:false,
                message:"Data not found"
            })
        }
        // get courses for different category
        const diffrentcategories=await Category({
            _id:{$ne:categoryId},
        })
        // .populate("Course").exec();
        // get top selling course 
        return res.status(200).json({
            success:true,
            data:categorydetails
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}