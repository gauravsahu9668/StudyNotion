import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
const ConatctUsForm = () => {

  const [loading,setloading]=useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitSuccessfull}
  }=useForm()


const submitContactForm=async(data)=>{
  console.log("logging data-> ",data)
  toast.success("message sent successfully")
  reset()
}

  useEffect(()=>{
    if(isSubmitSuccessfull){
      reset(
        {
          email:"",
          firstname:"",
          lastname:"",
          message:"",
          phoneno:"",
        }
      )
    }
  },[reset,isSubmitSuccessfull])


  return (
    <div className=' gap-5 pb-10'>
      <form onSubmit={handleSubmit(submitContactForm)}>
           <div className='flex flex-row gap-3 '>
                 <div className='flex flex-col gap-1'>
                <label htmlFor='firstname' className='text-[16px] font-bold text-richblack-500'>First Name</label>
             <input type='text' name="firstname" id='firstname' placeholder='Enter first name'
             {...register("firstname",{required:true})}
             className='w-full p-3 text-richblack-400 text-[16px] font-bold bg-richblack-800 rounded-lg  border-b-[3px] border-richblack-700'></input>
             {
              errors.firstname && (
                <span>
                  Please enter your first name
                </span>
              )
             }
                </div>
                <div>
                <div className='flex flex-col gap-1'>
             <label htmlFor='lastname'  className='text-[16px] font-bold text-richblack-500'>Last Name</label>
             <input type='text' name="lastname" id='lastname' placeholder='Enter last name'
             className='w-full p-3 text-richblack-400 text-[16px] font-bold bg-richblack-800 rounded-lg  border-b-[3px] border-richblack-700'
             {...register("lastname")}></input>
           </div>
                </div>
           </div>
           <div className='flex flex-col mt-3'>
              <label htmlFor='email' className='text-[16px] font-bold text-richblack-500'>Email Address</label>
              <input
              type='email'
              name='email'
              id='email'
              className='w-full p-3 text-richblack-400 text-[16px] font-bold bg-richblack-800 rounded-lg  border-b-[3px] border-richblack-700'
              placeholder='Enter your email'
              {...register("email",{required:true})}
              ></input>
              {
                errors.email && (
                  <span>
                    Please enter your email address
                  </span>
                )
              }
           </div>
           <div className='flex flex-col mt-3 gap-1'>
            {/* message */}
              <label htmlFor='message' className='text-[16px] font-bold text-richblack-500'>Message</label>
              <textarea
              name='message'
              id='message'
               className='w-full p-3 text-richblack-400 text-[16px] font-bold bg-richblack-800 rounded-lg  border-b-[3px] border-richblack-700'
              cols='30'
              rows='7'
              placeholder='enter your message here'
            {...register("message",{required:true})}></textarea>
            {
              errors.message && (
                <span>
                  Please enter your message
                </span>
              )
            }
           </div>
           <div className='flex flex-col mt-3 gap-1'>
              <label htmlFor='phoneno' className='text-[16px] font-bold text-richblack-500'>Contact Number</label>
              <input type='text' name='phoneno' id='phoneno'
              className='w-full p-3 text-richblack-400 text-[16px] font-bold bg-richblack-800 rounded-lg  border-b-[3px] border-richblack-700'
              placeholder='12345xxxx' {...register("phoneno",{required:true})}></input>
           </div>
           <button type='submit' className='rounded-md bg-yellow-50 text-center p-3 mt-5 text-[16px] font-bold text-black w-full'>
             Send message
           </button>
      </form>
    </div>
  )
}

export default ConatctUsForm
