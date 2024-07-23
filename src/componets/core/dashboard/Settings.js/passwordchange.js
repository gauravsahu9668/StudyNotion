import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updatepassword} from '../../../../services/operation/ProfileAPI'
const PasswordUpdate = () => {
    const {token}=useSelector((state)=>state.auth)
    const [passdata,setpassdata]=useState({password:"",newpassword:""})
    const changeHandler=(e)=>{
        const {name,value}=e.target
        setpassdata(prevpassdata=>{
            return {
                ...prevpassdata,
                [name]:value
            }
        })
    }
    const dispatch=useDispatch()
    const submithandler=(e)=>{
        e.preventDefault()
        const {password,newpassword}=passdata
        dispatch(updatepassword(password,newpassword,token))
    }
  return (
    <div className='w-full rounded-md px-8 py-2 flex flex-col gap-3 bg-richblack-800'>
      <p className='text-[18px] text-richblack-25 font-bold p-3'>Password</p>
        <form onSubmit={submithandler}>
        <div className='flex  gap-3 p-2'>
          <div className='w-[50%] text-richblack-25 flex flex-col gap-2'>
            <label htmlFor='password' className='text-[16px] text-richblack-25 font-bold'>Current Password</label>
            <input type='text' onChange={changeHandler} required name='password' id='password' placeholder='Enter current password'
            className='p-3 outline-none bg-richblack-700 border-b-[3px] border-richblack-500 rounded-lg'></input>
          </div>
          <div className='w-[50%]  text-richblack-25 flex flex-col gap-2'>
            <label htmlFor='newpassword' className='text-[16px] text-richblack-25 font-bold'>New Password</label>
            <input type='text' onChange={changeHandler} name='newpassword' id='newpassword' placeholder='Enter new password'
            className='p-3 outline-none bg-richblack-700 border-b-[3px] border-richblack-500 rounded-lg'></input>
          </div>
        </div>
        <div className='flex items-center justify-end p-3 gap-3 mt-2 '>
          <button type='submit' className='px-4 py-1 text-[16px] text-black font-bold bg-yellow-50 rounded-lg'>Save</button>
        </div>
        </form>
    </div>
  )
}

export default PasswordUpdate

