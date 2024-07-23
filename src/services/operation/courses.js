import { apiconnector } from "../apiconnector";
import { categories } from "../apis";
import toast from "react-hot-toast";

export async function getinstructorallcourses(token){
    const { GET_INSTRUCTOR_ALL_COURSES_API}=categories
    let result=[]
    try{
        const response=await apiconnector("GET",GET_INSTRUCTOR_ALL_COURSES_API,{token},{
            'Authorization':`Bearer ${token}`
        })
        result=response.data.data
        return result
    }catch(error){
        console.log(error)
    }
}
export async function addcourseDetails(formdata,token){
    const {CREATE_COURSE_API}=categories
    try{
        
        const response=await apiconnector("POST",CREATE_COURSE_API,formdata,{
            'Authorization':`Bearer ${token}`
        })
        return response
    }catch(error){
        console.log("error a gya")
        console.log(error)
    }
    console.log("yha bhi a gya")
}
export async function createsesction(sectionName,courseId,token){
    const {CREATE_SECTION_API}=categories
 try{
    const result=await apiconnector("POST",CREATE_SECTION_API,{sectionName,courseId,token},{
        'Authorization':`Bearer ${token}`
    })
    return result
 }catch(error){
    console.log(error)
 }
}
export async function updatedsection(sectionName,sectionId,token){
    const {UPDATE_SECTION_API}=categories
    try{
        const result=await apiconnector("PUT",UPDATE_SECTION_API,{sectionName,sectionId,token},{
            'Authorization':`Bearer ${token}`
        })
    }catch(error){
        console.log(error)
    }
}
export async function deleteSection(sectionId,token,courseId){
    const {DELETE_SECTION_API}=categories
    try{
        const toastId=toast.loading("loading")
        const response=await apiconnector("DELETE",DELETE_SECTION_API,{sectionId,token,courseId},{
            'Authorization':`Bearer ${token}`
        })
        toast.dismiss(toastId)
        console.log(response)
        if(response.data.success){
            toast.success("Section deleted")
        }
        return response
    }catch(error){
        console.log(error)
    }
}
export async function uploadsubsection(formdata,token){
    const {CREATE_SUBSECTION_API}=categories
    try{
        const response=await apiconnector("POST",CREATE_SUBSECTION_API,formdata,{
            'Authorization':`Bearer ${token}`
        })
        return response
    }catch(error){
        console.log(error)
    }
}

export async function subsectiondelete(subsectionId,courseId,token){
    const {DELETE_SUBSECTION_API}=categories
    try{
        const toastid=toast.loading("Loading...")
        const result=await apiconnector("DELETE" ,DELETE_SUBSECTION_API,{subsectionId,courseId,token},{
            'Authorization':`Bearer ${token}`
        })
        toast.dismiss(toastid)
        console.log(result)
        return result
    }catch(error){
        console.log(error)
        console.log("error a gya hai")
    }
}
export async function statuspublish(courseId,publish,token){
    const {PUBLISH_COURSE_API}=categories
    try{
        const toastid=toast.loading("Loading..")
        const response=await apiconnector("POST",PUBLISH_COURSE_API,{courseId,publish,token},{
            'Authorization':`Bearer ${token}`
        })
        toast.dismiss(toastid)
        console.log(response)
        return response
    }catch(error){
        console.log(error)
    }
}

export async function deleteCourse(courseId,token){
    const {DELETE_COURSE_API}=categories
    try{
        const result=await apiconnector("DELETE",DELETE_COURSE_API,{courseId,token},{
            'Authorization':`Bearer ${token}`
        })
        console.log(result)
    }catch(error){
        console.log(error)
    }
}

export async function getcoursedetails(courseId,token){
    const {GETFULL_COURSE_DETAILS}=categories
    try{
        const response=await apiconnector("GET",GETFULL_COURSE_DETAILS,{courseId,token},{
            'Authorization':`Bearer ${token}`
        })
        console.log(response)
        return response
    }catch(error){
        console.log(error)
    }

}

export async function addedtocart(courseId,token){
    console.log("step-2")
    const {ADD_TO_CART_API}=categories
 try{
    console.log("step-3")
    const toastId=toast.loading("Loading...")
    const response=await apiconnector("PUT",ADD_TO_CART_API,{courseId,token},{
        'Authorization':`Bearer ${token}`
    })
    toast.dismiss(toastId)
    console.log(response)
    if(!response.data.success){
        toast.error(response.data.message)
    }
    else{
        toast.success(response.data.message)
    }
    console.log(response)
    return response
 }catch(error){
    console.log(error)
 }
}

export async function allcartDetails(token){
     const {CART_DETAILS_API}=categories
    try{
        console.log("yha to a gye hai")
        const response=await apiconnector("GET",CART_DETAILS_API,{token},{
            'Authorization':`Bearer ${token}`
        })
        return response
    }catch(error){
        console.log(error)
    }
}
export async function removeFromCart(token,courseId){
    const {REMOVE_FROM_CART_API}=categories
    try{
        const toastid=toast.loading("Loading..")
        const response= await apiconnector("PUT",REMOVE_FROM_CART_API,{courseId,token},{
            'Authorization':`Bearer ${token}`
        })
        toast.dismiss(toastid)
        console.log(response)
        return response
    }
    catch(error){
        console.log(error)
    }
}
export async function buyCourse(courseId,token){
    const {BUY_COURSE_API}=categories
    try{
        const toastId=toast.loading("Loading..")
        const response=await apiconnector("PUT",BUY_COURSE_API,{courseId},{
            'Authorization':`Bearer ${token}`
        })
        toast.dismiss(toastId)
        if(response.data.success){
            toast.success(response.data.message)
        }
        else{
            toast.success(response.data.message)
        }
        return response
    }catch(error){
        console.log('error')
    }
}
export async function rateandreview(token,rating,reveiws,courseid){
    const {RATING_REVIEW_API}=categories
    try{
         const response=await apiconnector("POST",RATING_REVIEW_API,{token,rating,reveiws,courseid},{
            'Authorization':`Bearer ${token}`
        })
        console.log(response)
        if(response.data.success){
          toast.success("Review added successfully");
        }
        return response;
    }catch(error){
        console.log(error)
    }
}
export async function getallreviews(token){
    const {GET_ALL_REVIEWS_API}=categories
    try{
        const response=await apiconnector("GET",GET_ALL_REVIEWS_API,{token},{
            'Authorization':`Bearer ${token}`
        })
        console.log(response)
        return response
    }
    catch(error){
        console.log(error)
    }

}