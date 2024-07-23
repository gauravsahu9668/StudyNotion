
const express=require("express")
const app=express()
const fileuploader=require("express-fileupload")
const userRoutes=require("./routes/User")
const profileRoutes=require("./routes/Profile")
// const paymentRoutes=require("./routes/Payment")
const courseRoutes=require("./routes/Course")

const dbconnect=require("./config/database")

const cookieParser=require("cookie-parser")

// me ek hi system pr frontend and backed open krna chahta hn to mujhe cors ki need hogi

const cors=require("cors")

const connectcloudinary=require("./config/connectcloudinary")

require("dotenv").config()
const PORT=process.env.PORT || 4000
dbconnect();

app.use(express.json())
// app.use(cookieParser)
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))

app.use(fileuploader({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

connectcloudinary();
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
// app.use("/api/v1/payment",paymentRoutes);


app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Your server is up and running"
    })
})

app.listen(PORT,()=>{
    console.log(`app is running at port ${PORT}`)
})
