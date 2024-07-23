// sign up
// login 

// esme controller likhenge signup or login se related
const User=require("../models/User")
const Otp=require("../models/Otp")
const otpgenerator=require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.sendOTP=async(req,res)=>{
   try{
     // fetch email enter
     const {email}=req.body;
     // check already exits or not
     const checkuserpresent=await User.findOne({email});
 
     if(checkuserpresent){
         return res.json({
             success:false,
             message:'User already exits',
         })
     }
     // generate otp
    //  here you can show the length specila character
     var otp=otpgenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
     });
     console.log("otp generated");
    //  ye make sure krna hai ki otp aya hai bo unique hona chahiye
    // check unique otp or not
    // let result=await Otp.findOne({otp});
    // while(result){
    //     otp=otpgenerator.generate(6,{
    //         upperCaseAlphabets:false,
    //         lowerCaseAlphabets:false,
    //         specialChars:false
    //      });
    //     result=await Otp.findOne({otp});
    // }
    // db me entry create krenge
    const otpbody =await Otp.create({email,otp});
    console.log(otpbody);
    return  res.status(200).json({
        success:true,
        message:"otp sent successfully",
     })
   }
   catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"error in sending the message"
    })
   }

};
exports.signup=async(req,res)=>{
    // data fetch krunga from req ki body
    // data ko validate kr lo
    // 2 password aye unko match kro
    // check already exits or not
    // find most resent otp enter by user
    // validate OTP 
    // has password
    // entry create in db
    // return res;
   try{
    const {firstName,lastName,email,password,confirmpassword,accountType,otp}=req.body;
    if(!firstName || !lastName || !email || !password || !confirmpassword){
        return res.json({
            success:false,
            message:"all fields are requierd"
        })
    }
    if(password!=confirmpassword){
    return res.status(400).json({
        success:false,
        message:"Password and confirmpassword not matched"
    })
    }
    // check user exits or not
    const exitinguser=await User.findOne({email});
    if(exitinguser){
        return res.status(400).json({
            success:false,
            message:"user is already resistered"
        })
    }
    // es case me esse generated bhut sare otp a jayenge 
    // es quiry se hmne createdAT ke base pr find kr di
    const recentotp=await Otp.find({email}).sort({createdAt:-1}).limit(1);
    if(recentotp.length===0){
        return res.json({
            success:false,
            message:"OTP not found"
        })
    }
    if (otp !== recentotp[0].otp) {
        return res.json({
            success: false,
            message: "OTP does not match"
        });
    }
    // hash function 

    const newpassword=await bcrypt.hash(password,10);
    // entry create krenge
    // new user confir, ho gya to uski ek profile bnana pdega or use db me save krna pdega
    const porfilecreation=await Profile.create({
        gender:null,
        dateofbirth:null,
        about:null,
        contactNumber:null,
    })
    // yha hm ek api ka use krenge jo hme image lakr dega first name or last name se
    const user=await User.create({
        firstName,lastName,email,password:newpassword,accountType,additionaldetails:porfilecreation._id,
        image:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })
    res.status(200).json({
        success:true,
        message:"User is resisterd successfully",
        data:user
    })
   }
   catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"user can not be resisterd please try again later"
    })
   }

}
// login 
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        // validation in data
        // user exits or not
        // password check kro shi hai kya nhi 
        // generate jwt token
        // response ke santh send kr do 
        // create kr do coookie
        if(!email || !password){
            return res.json({
                success:false,
                message:"All feids are required please try again"
            })
        }
        const userexit=await User.findOne({email}).populate('additionaldetails').exec()
        if(!userexit){
            return res.json({
                success:false,
                message:"please create account"
            })
        }
        const check=await bcrypt.compare(password,userexit.password);
        const payload={
            email:userexit.email,
            id:userexit._id,
            role:userexit.accountType
        }
        if(check){
            const token=jwt.sign(payload,process.env.JWT_SECRET,
                {expiresIn:"2hr"});
        userexit.token=token;
        userexit.password=undefined;
        // token kab expires hoga bo bhi to show krna pdega
        const options={
            // ye show krta hai ki teen din bad apki cookie expires kr jayegi
            expires:new Date(Date.now()+3*24*60*60*1000)
        }
        return res.cookie("token",token,options).status(200).json({
            success:true,
            token:token,
            data:userexit,
            message:"logged in successfully"
        })
        }
        else{
            return res.json({
                success:false,
                message:"Please enter correct password"
            })
        }
        
    }
    catch(error){
        console.log(error)
        return res
    }
}