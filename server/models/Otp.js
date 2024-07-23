const mongoose=require("mongoose");
const mailsender = require("../utils/mailsender");
// ye thoda samjhna hai jab hm otp genrate kr rhe honge tab
// what is actually happnning
const OTPschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

async function sendverificationEmail(email,otp){
    try{
        const mailresponse=await mailsender(email,"Verification Email from studyNotion",otp);
        console.log("Email sent successfully:",mailresponse)
    }
    catch(err){
        console.log("error coccured while sending mails",err);
        throw err;
    }
}

OTPschema.pre("save" ,async function(next){
    await sendverificationEmail(this.email,this.otp);
    next();
})



module.exports=mongoose.model("OTP",OTPschema)