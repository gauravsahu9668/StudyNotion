const nodemailer=require("nodemailer");
require("dotenv").config();
const mailsender=async(email,title,body)=>{
    try{
        const transporter= nodemailer.createTransport({
           host:process.env.MAIL_HOST,
           auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
           }
        })
        let info=transporter.sendMail({
            from:"Study notion by gaurav sahu",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log(info);
        return info;
    }
    catch(error){
        console.log(error.message)
    }
}
module.exports=mailsender;