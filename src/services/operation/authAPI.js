import { setLoading, setToken } from "../../slices/authSlice"
import { setTotalItems } from "../../slices/cartSlice";
import { setCourse, setStep } from "../../slices/courseSlice";
import { setUser } from "../../slices/profileSlice";
import { apiconnector } from "../apiconnector";
import {categories} from '../apis'
import toast from "react-hot-toast";



export async function sendotp(email,navigate){
    try{
        const result=await apiconnector("POST",categories.SENTOTP_API,{email,})
        console.log(result)
        if(result.data.success===true){
            toast.success("otp sent successfully")
            navigate("/verifyOTP")
        }
        else{
            console.log("USer already exits")
            toast.error("user already exits")
        }
        return result
    }catch(error){
        console.log(error)
    }
}

export function signUP(
    firstName,
    lastName,
    email,
    password,
    confirmpassword,
    accountType,
    otp,navigate
){
    return async(dispatch)=>{
        const{SIGNUP_API}=categories
        try{
            const response=await apiconnector("POST",SIGNUP_API,{firstName,lastName,email,password,confirmpassword,accountType,otp})
            console.log(response)
            if(response.data.success){
                toast.success("Signup successfully")
                navigate('/verifyOTP')
            }
            else{
                toast.error("Please enter correct otp")

            }
        }catch(error){
            console.log(error)
        }
    }
}
export function login(email,password,navigate){
    const {LOGIN_API}=categories
    return async(dispatch)=>{
        try{
            const result=await apiconnector("POST",LOGIN_API,{email,password})
            console.log(result.data.data)
            if(result.data.success){
                toast.success(result.data.message)
                dispatch(setToken(result.data.token))
                dispatch(setUser(result.data.data))
                // localStorage.setItem('token',result.data.token)
                // localStorage.getItem('user',result.data.data)
                dispatch(setTotalItems(result.data.data.cart.length))
                navigate("/dashboard/my-profile")
            }
            else{
                toast.error(result.data.message)
            }
            
        }
        catch(error){
            console.log(error)
            toast.error("login failed")
        }
    }
}

export function logout(navigate){
    return async(dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(setStep(1))
        // dispatch(setCourse(null))
        // localStorage.removeItem('token')
        // localStorage.removeItem('user')
        toast.success("logout successfully")
        navigate("/")
    }
}


export function getPasswordResetToken(email,setemailsend){
    const {RESETPASSWORDTOKEN_API} =categories
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const response=await apiconnector("POST",RESETPASSWORDTOKEN_API,{email,})
            console.log(response)
            toast.success("email send successfully")
            setemailsend(true)
        }catch(error){
            console.log("RESET password token error")
            toast.error("error in sending email")
        }
        dispatch(setLoading(false))
    }
}

export function resetpassword(password,confirmpassword,token){
     const {RESETPASSWORD_API}=categories
     return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const response=await apiconnector("PUT",RESETPASSWORD_API,{password,confirmpassword,token})
            console.log(response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("password reset successfully")
        }catch(error){
            console.log("error")
            toast.error("Unable to reset password")
        }
     }
}