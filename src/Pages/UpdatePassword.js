import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { resetpassword } from '../services/operation/authAPI'
import { setLoading } from '../slices/authSlice'
const UpdatePassword = () => {
    const location=useLocation()
    const dispatch=useDispatch()
    const [formdata,setformdata]=useState({password:"",confirmpassword:""})
    const loading=useSelector((state)=>state.auth)
    const {password,confirmpassword}=formdata
    const changeHandler=(e)=>{
        const{ name,value}=e.target
        setformdata(prevformdata=>{
            return{
                ...prevformdata,
                [name]:value,
            }
        })
    }
    // token present hoga hmara pathname jo ayega usme
    const token=location.pathname.split('/').at(-1);
    const handleonsubmit=(e)=>{
        dispatch(setLoading(false))
        e.preventDefault()
        dispatch(resetpassword(password,confirmpassword,token))
    }
  return (
    <div className='w-[80%] flex flex-row justify-center items-center h-[650px] mx-auto'>
      {
        // loading ?(
        //     <div>Loading...</div>
        // ):(
            <div className="w-[400px] h-[500px] flex flex-col gap-2 pt-5">
                <h1  className='text-white text-[30px] font-bold'>Choose new Password</h1>
                <p  className='text-richblack-500 text-[16px] font-semibold'>Almost Done Enter your new password and youre all set</p>
                <form onSubmit={handleonsubmit}>
                    <label>
                        <p  className='text-richblack-500 text-[16px] font-semibold'>New Password</p>
                        <input
                        required
                        type='password'
                        name='password'
                        value={password}
                        onChange={changeHandler}
                        placeholder='Enter new passowrd'
                        className=' rounded-lg mt-3 outline-none text-white p-2 w-full bg-richblack-800 border-b-[2px] border-richblack-600'
                        ></input>
                    </label>
                    <div className='mt-3'>
                    <label className='mt-3'>
                        <p className='text-richblack-500 text-[16px] font-semibold'>Confirm Password</p>
                        <input
                        required
                        type='confirmpassword'
                        name='confirmpassword'
                        value={confirmpassword}
                        onChange={changeHandler}
                        placeholder='confirm new password'
                         className=' rounded-lg mt-3 outline-none text-white p-2 w-full bg-richblack-800 border-b-[2px] border-richblack-600'
                        ></input>
                    </label>
                    </div>
                    <button type='submit' className=' rounded-lg mt-5 bg-yellow-50 text-black text-[18px] font-bold py-2 w-full text-center'>Reset Password</button>
                </form>
                <div className='flex gap-3 items-center text-white '>
                  <BsArrowLeft color='white'></BsArrowLeft>
                  <Link to="/login">
                  <p>Back to login</p>
                  </Link>
                </div>
            </div>
      }
    </div>
  )
}
export default UpdatePassword
