import React, { useState } from 'react'
import LogerType from './LogerType'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/operation/authAPI'
const LoginForm = () => {
  const navigate=useNavigate();
  const clickHandler=()=>{
    navigate("/Forgotpassword")
  }
  const [logindata,setlogindata]=useState({email:"",password:""})
  const dispatch=useDispatch()
  const changeHandler=(e)=>{
    const {name,value}=e.target
    setlogindata(prevlogindata=>{
      return {
        ...prevlogindata,
        [name]:value
      }
    })
  }
  const submithandler=(e)=>{
    e.preventDefault()
    console.log(logindata)
    const {email,password}=logindata
    dispatch(login(email,password,navigate))
  }
  return (
    <div className='flex flex-col gap-3 mt-10'>
      {/* <LogerType  accountType={accountType} setAccountType={setAccountType}></LogerType> */}
      <form onSubmit={submithandler}>
        <div className='flex flex-col gap-2'>
            <label for='email' className='text-lg font-bold text-richblack-600 '>Email Address</label>
            <input onChange={changeHandler} type='email' required placeholder='Enter email address' id='email' name='email' className='
        outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
        </div>
        <div className='flex flex-col gap-2 mt-3'>
        <label for='password' className='text-lg font-bold text-richblack-600 '>Email Address</label>
        <input required onChange={changeHandler} type='password' placeholder='Enter password' id='password' name='password' className='
        outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
        </div>
        <div className='w-full text-end mt-2 text-md text-caribbeangreen-500 cursor-pointer' onClick={clickHandler}>forgot password</div>
        <button type='submit' className='w-full text-center py-3 mt-5 font-bold text-[16px] bg-yellow-50 rounded-lg'>Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
