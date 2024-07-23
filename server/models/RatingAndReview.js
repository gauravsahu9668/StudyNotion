const mongoose=require("mongoose");

const ratingSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    rating:{
        type:Number,
        required:true,
    },
    reviews:{
        type:String,
        required:true,
    }
});
module.exports=mongoose.model("RatingAndReviews", ratingSchema )