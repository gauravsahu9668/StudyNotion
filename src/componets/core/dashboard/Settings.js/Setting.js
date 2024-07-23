import React, { useState } from 'react'
import { GoUpload } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { updateprofile } from '../../../../services/operation/ProfileAPI';
import PasswordUpdate from './passwordchange';
import { updateprofilepicture } from '../../../../services/operation/ProfileAPI';
const Setting = () => {
  const user=useSelector((state)=>state.profile.user)
  const [updatedata,setupdatedata]=useState({firstName:"",lastName:"",gender:"",about:"",dateofbirth:"",contactNumber:""})

  const changeHandler=(e)=>{
    const {name,value}=e.target
    setupdatedata(prevupdatedata=>{
      return{
        ...prevupdatedata,
        [name]:value,
      }
    })
  }
  const {token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const submitHandler=(e)=>{
    const{firstName,lastName,dateofbirth,contactNumber,gender,about}=updatedata
    e.preventDefault()
    dispatch(updateprofile(firstName,lastName,dateofbirth,contactNumber,gender,about,token))
    console.log("printing new data")
    console.log(user)
  }
  const[profileimage,setprofileimage]=useState(null)
  const imagehandler=(event)=>{
        setprofileimage(event.target.files[0])
  }
  const imagesubmithandler=(e)=>{
       e.preventDefault()
       dispatch(updateprofilepicture(token,profileimage))
  }
  return (
    <div className='flex flex-col text-white gap-10 mt-6'>
           <h1 className='text-[30px] text-richblack-25 font-bold'>Edit Profile</h1>
           <div className='w-full rounded-md p-8 flex gap-3 bg-richblack-800'>
              <div> <img src={user.image} className='rounded-full w-[90px] h-[90px]' ></img></div>
              <div className='flex flex-col gap-3'>
                <p className='text-[16px] text-richblack-25'>Change Profile picture</p>
                <div className=' flex items-center gap-3'>
                  <form onSubmit={imagesubmithandler}>
                   <div className='flex flex-row gap-3 file-input'>
                    <div>
                    <input type='file' className='outline-none file' id='file' name='profileimage' onChange={imagehandler}></input>
                    <label htmlFor='file' className='bg-richblack-900'>Select</label>
                      </div> 
                    <button type='submit' className='flex items-center py-1 px-4 rounded-lg gap-2 font-bold bg-yellow-50 text-black text-[16px]'>
                    <span>Upload </span><GoUpload></GoUpload>
                    </button>
                   </div>
                  </form>
                </div>
              </div>
           </div>
           <div className='flex flex-col p-10 bg-richblack-800 rounded-lg'>
               <h1 className='text-[18px] text-richblack-25 font-bold p-3'>Profile Information</h1>
               <form onSubmit={submitHandler}>
                  <div className='w-full gap-3 p-3 flex items-center '>
                    <div className='w-[50%] text-richblack-25 flex flex-col gap-2'>
                      <label htmlFor='firstName' className='text-[16px] text-richblack-25 font-bold'>First Name</label>
                      <input type='text' required onChange={changeHandler} name='firstName' id='firstName' placeholder='Enter first name'
                      className='p-3 outline-none bg-richblack-700 border-b-[3px] border-richblack-500 rounded-lg'></input>
                    </div>
                    <div className='w-[50%]  text-richblack-25 flex flex-col gap-2'>
                      <label htmlFor='lastName' className='text-[16px] text-richblack-25 font-bold'>Last Name</label>
                      <input type='text' required  onChange={changeHandler} name='lastName' id='lastName' placeholder='Enter last name'
                      className='p-3 outline-none bg-richblack-700 border-b-[3px] border-richblack-500 rounded-lg'></input>
                    </div>
                  </div>
                  <div className='w-full gap-3 p-3 flex items-center'>
                    <div className='w-[50%] text-richblack-25 flex flex-col gap-2'>
                      <label className='text-[16px] text-richblack-25 font-bold' htmlFor='dateofbirth'>Date of Birth</label>
                      <input type='date' required onChange={changeHandler} name='dateofbirth' id='dateofbirth' placeholder='Enter dob'
                      className='p-3 outline-none bg-richblack-700 border-b-[3px] border-richblack-500 rounded-lg'></input>
                    </div>
                    <div className='w-[50%]  text-richblack-25 flex flex-col gap-2'>
                      <label htmlFor='gender' className='text-[16px] text-richblack-25 font-bold'>Gender</label>
                      <input type='text' required onChange={changeHandler} name='gender' id='gender' placeholder='Enter gender'
                      className='p-3 outline-none bg-richblack-700 border-b-[3px] border-richblack-500 rounded-lg'></input>
                    </div>
                  </div>
                  <div  className='w-full gap-3 p-3 flex items-center'>
                    <div className='w-[50%] text-richblack-25 flex flex-col gap-2'>
                      <label htmlFor='contactNubmer' className='text-[16px] text-richblack-25 font-bold'>Contact Number</label>
                      <input  type='text' required  onChange={changeHandler} name='contactNumber' id='contactNumber' placeholder='Enter Phone number'
                      className='p-3 outline-none bg-richblack-700 border-b-[3px] border-richblack-500 rounded-lg'></input>
                    </div>
                    <div className='w-[50%] text-richblack-25 flex flex-col gap-2'>
                      <label className='text-[16px] text-richblack-25 font-bold'>About</label>
                      <input  type='text' required  onChange={changeHandler} name='about' id='about' placeholder='Enter about yourself'
                      className='p-3 outline-none bg-richblack-700 border-b-[3px] border-richblack-500 rounded-lg'></input>
                    </div>
                  </div>
                  <div className='flex items-center justify-end p-3 gap-3 mt-2 '>
                    
                    <button type='submit' className='px-4 py-1 text-[16px] text-black font-bold bg-yellow-50 rounded-lg'>Save</button>
                  </div>
               </form>
           </div>
           <PasswordUpdate></PasswordUpdate>
           <div>
               
           </div>
    </div>
  )
}

export default Setting
