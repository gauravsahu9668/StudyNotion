const cloudinary=require("cloudinary").v2
// in this way upload documents to cloudinary
// /file and option hm upload kr rhe hote hai aur option me folder height ye sab add kr denge
exports.uploadToCloudinary=async(file,folder,height,quality)=>{
      const options={folder};
     if(height){
        options.height=height;
     }
     if(quality){
        options.quality=quality
     }
     options.resource_type="auto";
    //  file ka temp file path upload krna hai yad rkhna
     return await cloudinary.uploader.upload(file.tempFilePath,options)
}