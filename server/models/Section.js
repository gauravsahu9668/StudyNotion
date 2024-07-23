const mongoose=require("mongoose");

const sectionSchema=new mongoose.Schema({
     sectionName:{
          type:String,
     },
     subsection:[
          {
               type:mongoose.Schema.Types.ObjectId,
               requierd:true,
               ref:"SubSection"
          }
     ]

})
module.exports=mongoose.model("Section",sectionSchema);