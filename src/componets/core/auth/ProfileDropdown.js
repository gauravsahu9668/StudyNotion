import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operation/authAPI';
import { Link } from 'react-router-dom';
const ProfileDropdown = () => {
  const {user}=useSelector((state)=>state.profile)
  const [logdis,setlogdis]=useState(true)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const logouthandler=()=>{
    dispatch(logout(navigate))
  }
  return (
    <div className='text-white flex items-center relative group'>
      <div className='w-[35px] h-[35px] '>
        <img src={user.image} className='w-full h-full rounded-full'></img>
      </div>
      <div className='cursor-pointer'><RiArrowDropDownLine size={'2rem'} color='white' onClick={()=>{setlogdis(!logdis)}}></RiArrowDropDownLine></div>
      <div className={`flex flex-col text-[16px] justify-center bg-richblack-25 rounded-lg text-richblack-800 absolute w-[120px] p-1 gap-1  -right-10 top-10 invisible group-hover:visible transition-all duration-200`}>
        <div className='text-center hover:bg-richblack-100  rounded-full p-2 cursor-pointer'><Link to='/dashboard/my-profile'>Dashboard</Link></div>
        <div  onClick={logouthandler} className='flex gap-3 p-2 items-center justify-center   hover:bg-richblack-100 cursor-pointer rounded-full '>
          <CgLogOut></CgLogOut>
          Log Out
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown
