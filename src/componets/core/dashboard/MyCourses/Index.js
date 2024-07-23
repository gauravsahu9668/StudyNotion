import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getinstructorallcourses } from '../../../../services/operation/courses'
import { MdAdd, MdModeEdit } from "react-icons/md";
import { MdOutlineSystemSecurityUpdate } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { VscIssueDraft } from "react-icons/vsc";
import { MdOutlineDelete } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from 'react-hot-toast';
import { deleteCourse } from '../../../../services/operation/courses';
const MyCourses = () => {
    const {token}=useSelector((state)=>state.auth)
    const [allcourses,setallcourses]=useState([])
    const getallcourses=()=>{
        getinstructorallcourses(token)
        .then(result => {
            setallcourses(result)
            // You can access the data from the result here
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
    }
    const deletethecourse=(courseId)=>{
        deleteCourse(courseId,token).then((result)=>{
                toast.success("Course Deleted successfully")
                getallcourses()
        })
    }
    useEffect(()=>{
        getallcourses()
    },[token])
  return (
    <div className='flex flex-col gap-4 '>
       <div className='flex flex-row justify-between'>
       <h1 className='mt-5 text-[32px] font-bold text-richblack-50'>My Courses</h1>
       <Link to='/dashboard/add-course'>
       <button className='flex flex-row items-center text-black text-[16px]  bg-yellow-50 h-[40px] px-1 rounded-lg mt-5 '> <MdAdd></MdAdd> <span> Create New</span></button></Link>
       </div>
       <div>
        {
            allcourses.length===0 ?(
                <div className='w-full text-center text-[30px] text-richblack-50 font-bold'>No course added! Click on new</div>
            ):(
                <div className='flex flex-col pb-2  rounded-lg mb-2'>
                    <div className='flex p-3 bg-richblack-800 rounded-lg'>
                       <p className='w-[65%] text-[16px] text-richblack-50 font-bold uppercase'>courses</p>
                       <p className='w-[10%] text-[16px] text-richblack-50 font-bold uppercase'>Duration</p>
                       <p className='w-[10%] pl-2 text-[16px] text-richblack-50 font-bold uppercase'>Price</p>
                       <p className='w-[15%] pl-3 text-[16px] text-richblack-50 font-bold uppercase'>Action</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      {
                        allcourses.map((course,index)=>{
                            return (
                                <div key={index} className='w-full flex flex-row items-center border-b-[1px] border-richblack-500'>
                                    <div className='flex p-3 gap-2 w-[65%]'>
                                        <img src={course?.thumbnail} width='200px' height='170px' className='rounded-lg'></img>
                                        <div className='flex flex-col gap-2'>
                                           <p className='text-[18px] text-richblack-5 font-bold'>{course?.courseName}</p>
                                           <p className='text-richblack-400 text-[15px] font-semibold w-[85%]'>{course?.courseDescription}</p>
                                           <p className='text-richblack-500 text-[14px] font-semibold'>Created at:{" "+course?.time}</p>
                                           <p className=''>
                                            {
                                               course?.status==="Published" ? (<div className='w-fit flex items-center px-2 py-1 gap-x-2 text-yellow-200 rounded-full bg-richblack-800'>< MdOutlinePublishedWithChanges></MdOutlinePublishedWithChanges><span>{course?.status}</span></div>):
                                               (<div className='w-fit flex items-center px-2 py-1 gap-x-2 text-pink-700 rounded-full bg-richblack-800'><VscIssueDraft></VscIssueDraft><span>{course?.status}</span></div>)
                                            }
                                           </p>
                                        </div>
                                    </div>
                                    <div className='w-[10%] text-richblack-700 text-[16px] font-bold'>{course?.duration}</div>
                                    <div  className='w-[10%] text-richblack-300 text-[16px] font-bold'>Rs{" "+course?.price}</div>
                                    <div className='flex flex-row gap-5 text-richblack-300 '>
                                        <button>
                                           <MdModeEdit size={'1.5rem'} onClick={()=>{toast.error("This feature appears soon")}}></MdModeEdit>
                                        </button>
                                        <button>
                                            <RiDeleteBin5Line size={"1.5rem"} onClick={()=>{deletethecourse(course._id)}}></RiDeleteBin5Line>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                      }
                    </div>
                </div>
            )
        }
       </div>
    </div>
  )
}

export default MyCourses
