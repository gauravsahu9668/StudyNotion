import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TbEdit } from "react-icons/tb";
import CTAButton from '../homepage/Button';
const MyProfile = () => {
    const user=useSelector((state)=>state.profile.user)
    useEffect(()=>{
      
    },[user])
  return (
    <div className='w-full flex flex-col gap-5 mt-5'>
         <h1 className='text-[30px] text-white font-bold'>
            My Profile
         </h1>
         <div className='bg-richblack-800 rounded-md p-4 px-10 flex flex-row justify-between items-center'>
            <div className='flex items-center gap-3'>
                <img src={user?.image} 
                className='aspect-square w-[65px] rounded-full object-cover'></img>
                <div className='flex flex-col'>
                    <p className='text-[18px] text-white font-bold'>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-[16px] text-richblack-500'>{user.email}</p>
                </div>
            </div>
            <CTAButton active={true} linkto={"/dashboard/settings"}>
                <div className='flex gap-2 text-[14px]'><span>Edit</span>
                <TbEdit size={'1.2rem'}></TbEdit></div>
              </CTAButton>
         </div>
         <div className='flex flex-col px-10 p-4 bg-richblack-800 rounded-md'>
             <div className='flex flex-row justify-between'>
               <p className='text-[18px] text-white font-bold'>About</p>
               <CTAButton active={true} linkto={"/dashboard/settings"}>
                <div className='flex gap-2 text-[14px]'><span>Edit</span>
                <TbEdit size={'1.2rem'}></TbEdit></div>
              </CTAButton>
             </div>
             <p className='text-[16px] text-richblack-500'>{user?.additionaldetails?.about ?? "Write somthing about your self"}</p>
         </div>
         {/* section 3 */}
         <div className='flex flex-col px-10 p-4 gap-3 bg-richblack-800 rounded-md pb-5'>
             <div className='flex flex-row justify-between items-center'>
              <p className='text-[18px] text-white font-bold'>Personal Details</p>
              <CTAButton active={true} linkto={"/dashboard/settings"}>
                <div className='flex gap-2 text-[14px]'><span>Edit</span>
                <TbEdit size={'1.2rem'}></TbEdit></div>
              </CTAButton>
             </div>
             <div className='flex flex-row gap-24'>
                 <div className='flex flex-col gap-3'>
                    <h1 className='text-[16px] text-richblack-500 font-bold'>First Name</h1>
                    <p className='text-[16px] text-white '>{user?.firstName}</p>
                    <h1  className='text-[16px] text-richblack-500 font-bold'>Email</h1>
                    <p className='text-[16px] text-white '>{user?.email}</p>
                    <h1  className='text-[16px] text-richblack-500 font-bold'>Gender</h1>
                    <p className='text-[16px] text-white' >{user?.additionaldetails?.gender ?? "update profile"}</p>
                 </div>
                 <div className='flex flex-col gap-3'>
                    <h1 className='text-[16px] text-richblack-500 font-bold '>Last Name</h1>
                    <p className='text-[16px] text-white '>{user?.lastName}</p>
                    <h1  className='text-[16px] text-richblack-500 font-bold'>Phone Number</h1>
                    <p className='text-[16px] text-white '>{user?.additionaldetails.contactNumber ?? "Update Profile"}</p>
                    <h1  className='text-[16px] text-richblack-500 font-bold'>Date of Birth</h1>
                    <p className='text-[16px] text-white ' >{user?.additionaldetails?.dateofbirth ?? "update profile"}</p>
                 </div>
             </div>
         </div>
    </div>
  )
}

export default MyProfile
