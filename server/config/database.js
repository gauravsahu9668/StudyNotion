const  mongoose = require("mongoose");
require("dotenv").config();

const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("connection is establists");
    })
    .catch((error)=>{
        console.log("db connection failed")
        console.error(error);
        process.exit(1);
    })
}
module.exports=dbconnect;