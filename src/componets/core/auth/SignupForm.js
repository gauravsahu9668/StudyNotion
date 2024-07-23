import React, { useState } from 'react'
import LogerType from './LogerType'
import { useNavigate } from 'react-router-dom'
import { sendotp } from '../../../services/operation/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setsignupData } from '../../../slices/authSlice'
const  SignupForm = ({accountType,setAccountType}) => {
    const [formdata,setsignupdata]=useState({firstName:"",lastName:"",email:"",password:"",confirmpassword:"",accountType:accountType})
    const signuphandler=(event)=>{
        const {name,type,value}=event.target
        setsignupdata(prevformdata=>{
           return {
            ...prevformdata,
           [name]:value
           }
        })
    } 
    const dispatch=useDispatch()
    dispatch(setsignupData(formdata))
    const navigate = useNavigate();
    const submitHandler=(event)=>{
        event.preventDefault()
        // const result= apiconnector("POST",categories.SENTOTP_API,{email:signupdata.email})
        // .then(()=>{
        //     console.log(result)
        //     toast.success("Otp send successfully")
        //     navigate("/verifyOTP")
        // }
        // )
        console.log(formdata)
        const response=sendotp(formdata.email,navigate)
        console.log(response.data)
        console.log(response)
        // navigate("/verifyOTP")
    }
  return (
    <div className='flex flex-col gap-3 mb-5'>
      <LogerType accountType={accountType} setAccountType={setAccountType}></LogerType>
      <form onSubmit={submitHandler}>
        <div className='flex flex-row gap-2 items-center w-full'>
            <div className='flex flex-col gap-1 w-[50%]'>
                <label for="firstname" className='text-lg font-bold text-richblack-600 '>First Name</label>
                <input required onChange={signuphandler} type='text' placeholder='Enter first name' id='firstname' name='firstName' className='
        outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
            </div>
            <div className='flex flex-col gap-1 w-[50%]'>
                <label for="lastname" className='text-lg font-bold text-richblack-600 '>Last Name</label>
                <input required onChange={signuphandler} name="lastName" type='text' placeholder='Enter last name' id="lastname" className='
        outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
            </div>
        </div>
        <div className='flex flex-col gap-1 mt-3'>
            <label for='email' className='text-lg font-bold text-richblack-600 '>Email Address</label>
            <input required onChange={signuphandler} name="email" type='email'  placeholder='Enter email address' id='email' name='email' className='
        outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
        </div>
        {/* <div className='flex flex-col w-full gap-2 mt-3'>
            <label for="contactnumber" className='text-lg font-bold text-richblack-600 '>Phone Number</label>
            <div className='w-full flex flex-row gap-2'>    
                <input type='text' placeholder='+91' id='' className='w-[20%]
        outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
                <input type='text' placeholder='235456xxx' className='w-[80%]
        outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
            </div>
        </div> */}
        <div className='flex flex-row gap-2 mt-3'>
            <div className='flex flex-col gap-1 w-[50%]'>
                <label for="createpassword" className='text-lg font-bold text-richblack-600 '>Create Password</label>
                <input required onChange={signuphandler} name="password" type='password' placeholder="create password" id='createpassword'  className='
        outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
            </div>
            <div className='flex flex-col gap-1 w-[50%]'>
                <label for='confirmpassword' className='text-lg font-bold text-richblack-600 '>Confirm Password</label>
                <input required onChange={signuphandler} name="confirmpassword" type='text' placeholder='confirm password' id='confirmpassword'  className='
        outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
            </div>
        </div>
        <button type='submit'  className='w-full text-center py-3 mt-10 font-bold text-[16px] bg-yellow-50 rounded-lg'>Create account</button>
      </form>
    </div>
  )
}

export default SignupForm
