import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operation/authAPI'
import { BsArrowLeft } from 'react-icons/bs'
const Forgotpassword = () => {
    const [emailsend,setemailsend]=useState(false)
    const [email,setemail]=useState("");
    const loading=useSelector((state)=>state.auth.loading)
    const dispatch=useDispatch()
    const submitHandler=(event)=>{
      event.preventDefault()
      dispatch(getPasswordResetToken(email,setemailsend))
    }





  return (
    <div className='text-white flex items-center justify-center w-[80%] mx-auto h-[680px] '>
      {
        loading ?(
            <div className='mt-5'>Loading...</div>
        ):
        (<div className='w-[400px] h-[500px] flex flex-col p-3 gap-5'>
            <h1 className='text-white text-[30px] font-bold'>{!emailsend ? "Reset your password":"Check your Email"}</h1>
            <p className='text-richblack-500 text-[16px] font-semibold'>{!emailsend ? "Havw no fear. We'll email your instructions to reset your password. If you dont have access to your email we can try account recovery"
            :`We have sent the email reset link to your ${email} `}</p>
            <form onSubmit={submitHandler}>
              { !emailsend && (
                <label>
                  <p  className='text-richblack-500 text-[16px] font-semibold'>Email Address</p>
                  <input
                  required
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e)=>{setemail(e.target.value)}}
                  placeholder='Enter your Email address'
                  className=' rounded-lg mt-3 outline-none text-white p-2 w-full bg-richblack-800 border-b-[2px] border-richblack-600'
                  ></input>
                </label>
              )}
              <button type='submit' className=' rounded-lg mt-5 bg-yellow-50 text-black text-[18px] font-bold py-2 w-full text-center'>
                {
                  !emailsend? "Reset Password" : "Resend Email"
                }
              </button>
            </form>
            <div className='flex gap-3 items-center'>
              <BsArrowLeft color='white'></BsArrowLeft>
              <Link to="/login">
              <p>Back to login</p>
              </Link>
            </div>
        </div>)
      }
    </div>
  )
}

export default Forgotpassword
