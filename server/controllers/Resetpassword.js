const User=require("../models/User");
const mailsender=require("../utils/mailsender");
const bcrypt=require("bcrypt")
// first thing is that we will generate the token
exports.resetPasswordToken=async(req,res)=>{
  try{
      //fetch email id from req.ki body
    // check user for this email,email validation
    // mail krna hai link genrate krenge
    // udate user by adding token and expiration time
    // create url
    // send mail corresponding with link
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.json({
            success:false,
            message:"your email is not resisterd with us"
        })
    }
    const token=crypto.randomUUID();
    const updatedDetails=await User.findOneAndUpdate({email},{token:token,resetPasswordExpires:Date.now()+5*60*1000},{new:true});

    const url=`http://localhost:3000/update-password/${token}`
    await mailsender(email,"Password reset link",`Password reset link: ${url}`);
    return res.json({
        success:true,
        message:"email sent successfully",
        data:updatedDetails
    })
  }
  catch(err){
    return res.status(500).json({
        success:false,
        message:"error in sending email"
    })
  }
}


// ab link tumhari ek genrate hokr email pr a jayegi or phir tum us generated email se fronted pr chle jaoge actually
// me bo link fronted page ki hogi 
// ek page pr a jaoge jha new 
// frontend ke bhi routes hote hai jise tum khi pr new page open krne ke liye use kr skte ho

// reset password
exports.resetpassword=async(req,res)=>{
   try{
     // data fetch krlo
    // ab jo user ke andr hmne token dala tha bo user ki id ka password update krne me help krega krne me help kreg
    // yha hm jwt token ka use nhi kr skte use hm login ke bad hi use kr skte hai abhi hmne login hi nhi kiya hai 
    // esliye new token bnaya hai 
    // steps
    // data fetch
    // url me se token lena hai to params ka use krenge
    // frontend ne ese body me dal diya esliye hm eska use kr rhe hai
    const {password,confirmpassword,token}=req.body;
    // validation
    if(password!==confirmpassword){
        return res.json({
            success:false,
            message:"Password not matching",
        })
    }
    // user details find krenge
    const userDetails=await User.findOne({token:token});
    // if no entry -invalid token
    if(!userDetails){
        return res.json({
            success:false,
            message:"Token is invalid"
        })
    }
    // time check krenge
    if(userDetails.resetPasswordExpires<Date.now()){
        return res.json({
            success:false,
            message:"Token is expired Please regenerate your token"
        })
    }
    // hash krna pdega password ko
    const hasspassword= await bcrypt.hash(password,10)
    await User.findOneAndUpdate(
        {token:token},
        {password:hasspassword},
        {new:true}
    )
    return res.status(200).json({
        success:true,
        message:"Password Changed successfully please login"
    })
   }
   catch(error){
    return res.status(500).json({
        success:false,
        message:"Error in reseting the password"
    })
   }
}