//auth
const jwt=require("jsonwebtoken");
const User=require("../models/User");

exports.auth = async (req, res, next) => {
    try {
        console.log("Reached this point");

        // Extract token from headers or body
        console.log(req.headers['authorization'])
        const authHeader = req.headers['authorization'];

        const token = req.body.token || (authHeader && authHeader.split(' ')[1]);
        if (!token) {
            return res.json({
                success: false,
                message: "Token is missing"
            });
        }

        console.log('Token extracted successfully');

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token"
        });
    }
}


// isstudent
exports.isStudent=(req,res,next)=>{
    try{
        // role verify krunga
        // req ki userme se payload pda hai or payload me role pda hai bo yha se nikal lenge
     if(req.user.role!=="Student"){
        return res.status(401).json({
            success:false,
            message:"This is a protected route for students only"
        })
     }
     next();
    }
    catch(error){
        return res.status(500).json({
            success:true,
            message:"User role cannot be verified"
        })
    }
}
// jab decode kroge to payload jo hao bo decode me a jayega or phir further req me tum use add kr doge
// isInstructor
exports.isInstructor=(req,res,next)=>{
    try{
        // role verify krunga
     if(req.user.role!=="Instructor"){
        return res.status(401).json({
            success:false,
            message:"This is a protected route for Instructor only"
        })
     }
     next();
    }
    catch(error){
        return res.status(500).json({
            success:true,
            message:"User role cannot be verified"
        })
    }
}
// admin ka code hai
exports.iAdmin=(req,res,next)=>{
    try{
        // role verify krunga
     if(req.user.role!=="Instructor"){
        return res.status(401).json({
            success:false,
            message:"This is a protected route for Instructor only"
        })
     }
     next();
    }
    catch(error){
        return res.status(500).json({
            success:true,
            message:"User role cannot be verified"
        })
    }
}

