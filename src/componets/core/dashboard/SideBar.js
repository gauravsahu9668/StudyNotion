import React, { useState } from 'react'
import {sidebarLinks} from '../../../Data/dashboard-links'
import { logout } from '../../../services/operation/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLink from './SideBarLink'
import { VscSettingsGear } from 'react-icons/vsc'
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'
const SideBar = () => {

  const {user}=useSelector((state)=>state.profile)
  const [showlogout,setlogout]=useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const okHandler=()=>{
    dispatch(logout(navigate))
  }
  // if(profileloading || authloading){
  //   return (
  //     <div className='mt-10 w-full text-center'>
  //       Loading....
  //     </div>
  //   )
  // }
  return (
      <div className='flex min-w-[222px] flex-col border-r-[1px] border-richblack-700 pt-8
      h-[92vh] bg-richblack-800 fixed left-0'>
           
           <div>
            {
              sidebarLinks.map((link,index)=>{
                if(link.type && user?.accountType!==link.type) return null
                else{
                  return (
                  <SideBarLink link={link} iconName={link.icon} key={link.id}></SideBarLink>
                )
              }
              })
            }
           </div>
           <div className='mx-auto mt-6 mb-6 h-[1px] w-9/12 bg-richblack-500'></div>
           <div>
               <SideBarLink link={{name:"Settings",path:"dashboard/settings"}} iconName="VscSettingsGear"></SideBarLink>
           </div>
           <div className='flex flex-col gap-3 w-full'>
              <div onClick={()=>{setlogout(true)}} className='cursor-pointer ml-11 mt-4 flex flex-row gap-2 items-center text-[18px] text-richblack-50'>
                <VscSignOut></VscSignOut>
                <span>Logout</span>
              </div>
              <div className={`${showlogout ? "visible" : "invisible"} flex flex-col transition-all duration-200 gap-2 w-[90%] mx-auto text-center bg-richblack-900 rounded-lg p-3`}>
                <h1 className='text-white text-[16px]'>Are you Sure ?</h1>
                <div className='flex justify-around'>
                  <button className='px-3 py-1 bg-yellow-50 text-center text-[16px] font-bold rounded-md' onClick={okHandler}>Ok</button>
                  <button className='px-3 py-1 bg-richblack-50 text-center text-[16px] font-bold rounded-md' onClick={()=>{setlogout(false)}}>Cancel</button>
                </div>
              </div>
           </div>
      </div>
  )
}

export default SideBar
