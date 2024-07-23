import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice'
import { useForm } from 'react-hook-form'
import { GrAddCircle } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineNavigateNext } from "react-icons/md";
import { updatedsection } from '../../../../services/operation/courses';
import toast from 'react-hot-toast';
import { createsesction } from '../../../../services/operation/courses';
import NestedView from './NestedView';
const CourseBuilder = () => {
    const dispatch=useDispatch()
    const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm()
    const [loading,setloading]=useState(false)
    const [editsection,seteditsection]=useState(null)
    const {course}=useSelector((state)=>state.course)
    const {token}=useSelector((state)=>state.auth)
    const cancelEdit=()=>{
      seteditsection(null)
      setValue("sectionName","")
    }
    const goBack=()=>{
      toast.error("option not available now")
    }
    const goNext=()=>{
      console.log(course)
      if(course.coursecontent.length ===0){
        toast.error("we have atleast one section")
      }
      else if(course.coursecontent.some((section)=>section.subsection.length===0)){
        toast.error("please add atleast one lecture in each subsection")
      }
      else {
        dispatch(setStep(3))
      }
    }
    const onsubmit=async(data)=>{
          setloading(true)
          const toastId=toast.loading("loding")
          if(editsection!==null){
             updatedsection(data.sectionName,editsection,token).then((response)=>{
               if(response.data.success){
                toast.dismiss(toastId)
                toast.success("updated successfully")
               }
             })
          }
          else{
          createsesction(data.sectionName,course._id,token).then((response)=>{
            if(response.data.success){
              dispatch(setCourse(response.data.data))
              setValue("sectionName","")
              seteditsection(null)
              toast.dismiss(toastId)
              toast.success("Section created")
            }
            else{
              toast.error("error in creating section")
            }
          })
          }
        }
  return (
    <div className='w-full rounded-lg bg-richblack-800 flex flex-col p-5 mt-10 gap-2'>
         <p className='text-richblack-25 text-[28px] font-semibold'>Course Builder</p>
         <form onSubmit={handleSubmit(onsubmit)}>
          <div className='flex flex-col gap-2'>
            <label htmlFor='sectionname' className='text-richblack-50 font-bold'>Section name<sup>*</sup></label>
            <input
              id='sectionname'
              placeholder='Add section name'
              {...register("sectionName",{required:true})}
              className='w-full p-3 bg-richblack-900 text-richblack-500 outline-none rounded-lg border-b-[3px] border-richblack-500'

            ></input>
            {
              errors.SectionName && (
                <span>Section name is required</span>
              )
            }
          </div>
          <div className='mt-5 flex flex-row gap-2'>
             <button className='flex items-center gap-x-2 text-yellow-100 text-[16px] px-2 py-1 border-[2px] border-yellow-100 rounded-lg' type='submit'><span>{editsection ? "Edit Section Name" :"Create Section"}</span>
              <GrAddCircle></GrAddCircle>
             </button>
             {
              editsection && (
                <button type='button' onClick={cancelEdit}>cancel edit</button>
              )
             }
          </div>
         </form>
          {
            course.coursecontent.length >0 && <NestedView></NestedView>
          }
          <div className='flex justify-end gap-x-3 mt-5'>
             <button type='button' onClick={goBack} className='px-3 py-2 bg-richblack-600 rounded-lg flex flex-row items-center
             gap-x-2 text-black text-[14px]  font-bold'>
              <IoIosArrowRoundBack color='black' size={"1.5rem"}></IoIosArrowRoundBack> 
              <span className='text-[18px] font-bold'>Back</span>
             </button>
             <button type='button' onClick={goNext}  className='px-3 py-2 bg-yellow-100 rounded-lg flex flex-row items-center
             gap-x-2 text-black text-[14px]  font-bold'>
              <span className='text-[18px] font-bold'>Next</span>
              < MdOutlineNavigateNext color='black' size={"1.5rem"}></MdOutlineNavigateNext>
             </button>
          </div>
    </div>
  )
}

export default CourseBuilder
