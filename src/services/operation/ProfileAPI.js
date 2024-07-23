import { categories } from "../apis"
import { apiconnector } from "../apiconnector"
import { useSelector } from "react-redux"
import setUser, { updateUser } from '../../slices/profileSlice'
import toast from "react-hot-toast"
export function updateprofile(
    firstName,
    lastName,dateofbirth,contactNumber,gender,about,token
){
    const {UPDATE_PROFILE_API}=categories
    return async(dispatch)=>{
        try{
            const response=await apiconnector("PUT",UPDATE_PROFILE_API,{token,firstName,lastName,dateofbirth,gender,about,contactNumber})
            if(response.data.success){
                toast.success("Profile Updated")
                const updatedUser = response.data.data;
                 dispatch(updateUser(response.data.data))

            }
            else{
             toast.error("Erro in updateing profile")
            }
        }catch(error){
            console.log(error)
        }
    }

}


export function updatepassword(password,newpassword,token){
    const { UPDATE_PASSWORD_API}=categories
    return async(dispatch)=>{
        try{
            const response=await apiconnector("PUT",UPDATE_PASSWORD_API,{password,newpassword,token})
            console.log(response)
            if(response.data.success){
                toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)
            }
        }catch(error){
            console.log(error)
        }
    }
}
export async function getenrollingcourses(token) {
       const { GET_ENROLL_COURSES_API } = categories
        try {
            console.log(token); // Verify token is correct
            const response = await apiconnector("GET", GET_ENROLL_COURSES_API ,{token}, {
                'Authorization': `Bearer ${token}`, // Send token in Authorization header
            } 
            )
         
            return response.data.data
            // Dispatch an action to store the courses in the Redux state
            // dispatch({
            //     type: 'SET_ENROLLED_COURSES',
            //     payload: response.data,
            // });
        } catch (error) {
            console.log(error);
            console.log("Unable to fetch the data")
        }
    }



export function updateprofilepicture(token, profileimage) {
    const { UPDATE_PROFILE_PICTURE_API } = categories;
    return async (dispatch) => {
        try {
            const toastId=toast.loading("uploading...")
            const formData = new FormData();
        
            formData.append('profileimage', profileimage); 
            formData.append('token', token); 
            const response = await apiconnector("PUT", UPDATE_PROFILE_PICTURE_API, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                }, 
            });
            toast.dismiss(toastId)
            dispatch(updateUser(response.data.data))
                toast.success("profile picture updated")
            
        } catch (error) {
            console.log(error);
            console.log("error a gya bhaiya")
        }
    };
}

