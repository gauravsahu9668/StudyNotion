import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { sendotp } from '../services/operation/authAPI'
import { signUP } from '../services/operation/authAPI'
const VerifyOTP = () => {
  const [load,setload]=useState(false)
  const [otp,setotp]=useState('')

  const dispatch=useDispatch()
  const {signupdata}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!signupdata){
      navigate("/signup")
    }
  },[])
  const submitHandler=(e)=>{
    e.preventDefault();
    const {firstName,lastName,email,password,confirmpassword,accountType}=signupdata
    console.log(firstName,lastName,email,password,confirmpassword,accountType,otp)
    dispatch(signUP(firstName,lastName,email,password,confirmpassword,accountType,otp,navigate))
  }
  const resentHandler=()=>{
    sendotp(signupdata.email)
  }
  return (
    <div className='text-white w-[80%] mx-auto flex items-center justify-center p-[150px]'>
       {
        load? (
          <div>Loading....</div>
        ):(
          <div className='p-4 w-[420px] flex flex-col gap-3'>
            <h1 className='text-white text-[25px] font-bold'>Verify email</h1>
            <p className='text-[16px] text-richblack-400 font-bold'>A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={submitHandler}>
              {/* <OTPInput
              value={otp}
              onChange={setotp}
              numInputs={6}
              renderSeparator={<span className='text-richblack-900'>--</span>}
              placeholder='*'
              renderInput={(props) => <input {...props} className=' p-3 w-full'/>}
              ></OTPInput> */}
              <OTPInput
             value={otp}
             onChange={setotp}
             numInputs={6}
             renderSeparator={<span className="mx-2 text-richblack-900">--</span>}
             placeholder='*'
             renderInput={(props) => (
               <input 
                 {...props} 
                 className="p-3 w-12 border text-white bg-richblack-800 border-gray-300 rounded-md text-center focus:outline-none focus:border-blue-500" 
              />
                )}
             containerStyle="flex space-x-2 w-full"
             />
              <button type='submit' className='mt-5 w-full text-center p-3 bg-yellow-50 rounded-lg text-black text-[18px] font-bold'>
                Verify Email
              </button>
            </form>
            <div className='flex justify-between items-center py-2'>
              <div className='flex flex-row gap-2 items-center'>
                <BsArrowLeft></BsArrowLeft>
                <Link to="/login">
                <p>Back to login</p>
                </Link>
              </div>
              <button onClick={resentHandler} className='text-caribbeangreen-300'
              >Resend otp</button>
            </div>
          </div>
        )
       }
    </div>
  )
}

export default VerifyOTP
