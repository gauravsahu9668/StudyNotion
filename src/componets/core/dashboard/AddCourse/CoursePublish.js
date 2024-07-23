import React, { useEffect, useState } from 'react'
import { setCourse, setStep } from '../../../../slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { MdFormatLineSpacing, MdOutlineNavigateNext } from 'react-icons/md'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { statuspublish } from '../../../../services/operation/courses'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const CoursePublish = () => {
    const dispatch=useDispatch()

    const {register,handleSubmit,formState:{errors},setValue,getValues}=useForm()
    const {course}=useSelector((state)=>state.course)
    const {token}=useSelector((state)=>state.auth)
    const {step}=useSelector((state)=>state.course)
    const [checked,setcheck]=useState(false)
    const navigate=useNavigate()
    const goback=()=>{
      dispatch(setStep(2))
    }
    const gotomycourse=()=>{
      dispatch(setCourse(null))
      dispatch(setStep(1))
      navigate("/dashboard/my-courses")
    }
    const handleCoursePublish=()=>{
      const publish="Published"
          statuspublish(course._id,publish,token).then((result)=>{
            if(result.data.success){
              toast.success("Course published successfully")
              gotomycourse()
            }
          })
    }
    const onsubmit=(data)=>{
      if(data.public===true){
        handleCoursePublish()
      }
    }
  return (
    <div className='rounded-lg border-[1px] bg-richblack-800 p-6 border-richblack-700 text-white'>
         <h1 className='text-[28px] text-richblack-25 font-bold'>Publish Course</h1>
         <form onSubmit={handleSubmit(onsubmit)}>
            <div className='flex  gap-x-3 mt-5 ml-2 '>
            <input  type='checkbox' id='public' {...register("public",{required:true})}  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 
            transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0
             before:transition-opacity
             checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10" 
        ></input>
            <label htmlFor='public' className='text-richblack-100 font-semibold text-[15px] '>Make this Course as public</label>
            </div>
            <div className='flex gap-x-4 items-center justify-end mt-4'>
                <button onClick={()=>{goback()}} type='button'className='px-3 py-2 bg-richblack-600 rounded-lg flex flex-row items-center
                gap-x-2 text-black text-[14px]  font-bold'>
                 <IoIosArrowRoundBack color='black' size={"1.5rem"}></IoIosArrowRoundBack> 
                <span className='text-[18px] font-bold'>Back</span>
                </button>
                <button type='submit'   className='px-3 py-2 bg-yellow-200 rounded-lg flex flex-row items-center
                gap-x-2 text-black text-[14px]  font-bold'>
                <span className='text-[18px] font-bold'>Save Changes</span>
               </button>
            </div>
         </form>
    </div>
  )
}

export default CoursePublish
