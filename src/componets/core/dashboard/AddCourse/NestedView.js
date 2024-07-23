import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteSection } from '../../../../services/operation/courses';
import toast from 'react-hot-toast';
import { resetCourseState, setCourse } from '../../../../slices/courseSlice';
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useForm } from 'react-hook-form';
import { uploadsubsection } from '../../../../services/operation/courses';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoMdAdd } from 'react-icons/io';
import { subsectiondelete } from '../../../../services/operation/courses';
import { IoIosArrowDropup } from "react-icons/io";
const NestedView = () => {
  const {course}=useSelector((state)=>state.course)
  const {token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
   const [addsubsection,setaddsubsection]=useState(false)
   const [viewsubsection,setviewsubsection]=useState(null)

   const [confirmationModal,setconfirmationModal]=useState(null)
   const[sectionid,setsectionid]=useState(null)
   const deletesectionHandler=(sectionId)=>{
       deleteSection(sectionId,token,course._id).then((response)=>{
         if(response.data.success){
          dispatch(setCourse(response.data.data))
         }
       })
   }
   const deletesubsectionhandler=(subsectionId)=>{
        subsectiondelete(subsectionId,course._id,token).then((response)=>{
          if(response.data.success){
            toast.success("subsection deletd successfully")
            dispatch(setCourse(response.data.data))
          }
        })
   }
   const {register,reset,handleSubmit,formState:{errors}, setValue}=useForm()
   const onsubmit=(data)=>{
    console.log(data)
    console.log(course._id)
     const formdata=new FormData()
     const {subTitle,subDescription,videofile}=data
     formdata.append("title",subTitle)
     formdata.append("description",subDescription)
     formdata.append("videofile",videofile[0])
     formdata.append("token",token)
     formdata.append("sectionId",sectionid)
     formdata.append("courseId",course._id)
     const toastId=toast.loading("Loading...")
     uploadsubsection(formdata,token).then((response)=>{
       if(response.data.success){
        toast.dismiss(toastId)
        toast.success("SubSection Created successfully")
        dispatch(setCourse(response.data.data))
       }
     })
   }
   const [sectiondrop,setsectiondrop]=useState(null)

  return (
    <div>
       <div className='rounded-lg bg-richblack-700 p-3 mt-5 w-full'>
           {
                  course?.coursecontent?.map((section)=>{
                    return (
                      <details key={section._id} open>
                        <summary className='flex flex-col items-center justify-between w-full gap-x-3  p-2 gap-y-2'>
                        <div className='flex items-center justify-between w-full text-[19px] text-richblack-50'>
                        <div className='flex items-center gap-x-3'>
                            {
                              sectiondrop!==section._id ? (<RxDropdownMenu onClick={()=>{setsectiondrop(section._id)}} className='cursor-pointer'></RxDropdownMenu>)
                              :(<IoIosArrowDropup onClick={()=>{setsectiondrop(null)}} className='cursor-pointer'></IoIosArrowDropup>)
                            }
                          <p>{section.sectionName}</p>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <button onClick={()=>{toast.error("This features apears soon")}}><MdModeEdit></MdModeEdit></button>
                            <button onClick={()=>{deletesectionHandler(section._id)}}><RiDeleteBin6Line></RiDeleteBin6Line></button>
                            
                        </div>
                        </div>
                        {
                          sectiondrop===section._id && (
                            <div className='w-full flex flex-col gap-2 p-4 border-b-[2px] border-richblack-500'>  
                             <div className='p-2 border-t-[2px] border-richblack-500 rounded-lg w-full'>
                                 {
                                     sectionid===section._id && (
                                    <form onSubmit={handleSubmit(onsubmit)}>
                                     <div className='flex flex-col gap-y-2 mt-3'>
                                      <label htmlFor='title' className='text-[16px] text-richblack-50 font-semibold '>Title<sup className='text-pink-400'>*</sup></label>
                                      <input className='w-full p-3 bg-richblack-900 text-richblack-500 outline-none rounded-lg border-b-[3px] border-richblack-500' type='text' id='title' placeholder='Add title' {...register("subTitle",{required:true})}></input>
                                      {
                                        errors.subTitle && (
                                          <span>Add Title</span>
                                        )
                                      }
                                     </div>
                                      <div className='flex flex-col gap-y-2 mt-3'>
                                      <label htmlFor='file' className='text-[16px] text-richblack-50 font-semibold '>Upload Video</label>
                                      <input className='w-full p-3 bg-richblack-900 text-richblack-500 outline-none rounded-lg border-b-[3px] border-richblack-500' type='file' id='file' placeholder='Add Video file' {...register("videofile",{required:true})}></input>
                                      {
                                        errors.videofile && (
                                          <span>Upload video</span>
                                        )
                                      }
                                      </div>
                                      <div className='flex flex-col gap-y-2 mt-3'>
                                        <label htmlFor='description'  className='text-[16px] text-richblack-50 font-semibold '>Add description</label>
                                        <input  className='w-full p-3 bg-richblack-900 text-richblack-500 outline-none rounded-lg border-b-[3px] border-richblack-500' type='text' id='description' placeholder='Add description' {...register("subDescription",{required:true})}></input>
                                        {
                                        errors.subDescription && (
                                          <span>Add description</span>
                                        )
                                        }
                                      </div>
                                       <div className='flex justify-end gap-x-2 items-center mt-2'>
                                       <button type='button' onClick={()=>{setsectionid(null)
                                        reset()}} className='text-[16px] text-richblack-200 '>cancel</button>
                                        <button type='submit' className='text-[15px] text-yellow-100 px-3 py-1 border-[2px] border-yellow-100 rounded-lg '>Save</button>
                                       </div>
                                     </form>
                                  ) 
                                 }
                             </div>
                             <div>
                               <button onClick={()=>setsectionid(section._id)} className='flex items-center gap-x-2 text-yellow-100 text-[16px] font-bold'>
                                  <IoMdAdd size={"1.5rem"}></IoMdAdd>
                                  <span>Add Lecture</span>
                                 </button>
                               </div>
                             {
                              section.subsection.map((data)=>{
                                return(
                                  <div key={data._id} className='flex flex-col gap-3 w-full' >
                                       <div className='flex flex-row items-center justify-between mt-2 text-[17px] text-richblack-50 font-semibold w-full'>
                                          <h1>{data.title}</h1>
                                          <div className='flex flex-row items-center gap-x-2'>
                                            <button><MdModeEdit></MdModeEdit></button>
                                            <button onClick={()=>{deletesubsectionhandler(data._id)}}><RiDeleteBin6Line></RiDeleteBin6Line></button>
                                            {
                                              viewsubsection!==data._id ? (
                                                <IoMdArrowDropdown onClick={()=>{setviewsubsection(data._id)}}></IoMdArrowDropdown>
                                              ):(
                                                <IoMdArrowDropup onClick={()=>{setviewsubsection(null)}}></IoMdArrowDropup>
                                              )
                                            }
                                          </div>
                                       </div>
                                       {
                                        data._id ===viewsubsection && (
                                          <div className='w-full flex flex-col gap-y-2'>
                                            <div>
                                              <video src={data.videoUrl} controls className='w-fit h-fit' preload='auto' loop={false}></video>
                                            </div>
                                            <p className='text-richblack-200 text-[13px]'>{data.description}</p>
                                          </div>
                                        )
                                       }
                                  </div>
                                )
                              })
                             }
                        </div>
                          )
                        }
                      </summary>
                    </details>
                    )
                  })
           }
       </div>
    </div>
  )
}

export default NestedView
