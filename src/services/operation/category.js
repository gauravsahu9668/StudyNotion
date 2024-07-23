import { apiconnector } from "../apiconnector"
import { categories } from "../apis"

 export async function getCataAlCourses(categoryId){
    const {CATEGORY_COURSE_API}=categories
    try{
        const response=await apiconnector("GET",CATEGORY_COURSE_API,{categoryId})
        console.log(response)
        return response
    }catch(error){
        console.log(error)
    }
 }