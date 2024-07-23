import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCataAlCourses } from '../services/operation/category'
import { FaStar } from "react-icons/fa6";
import { FaFaceSadCry } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Footer from '../componets/common/Footer/Footer';
const Category = () => {
    const location=useLocation()
    const categoryId=location.pathname.split('/').at(-1)
    const [allcatcourses,setallcatcourse]=useState([])

    const gettingcategorycourses=()=>{
        getCataAlCourses(categoryId).then((response)=>{
           setallcatcourse(response.data.data)
        })
    }
    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const navigate=useNavigate()
    const gototcoursebuy=(courseId)=>{
      if(token!==null && user?.accountType !=="Instructor"){
        navigate(`/course-buy/${courseId}`)
      }
      else{
        if(user?.accountType==="Instructor"){
          toast.error("Create Student Account")
        }
        else{
          toast.error("Please login")
        }
      }
    }
    useEffect(()=>{
        gettingcategorycourses()
        console.log('first time render')
    },[categoryId])
  return (
    <div className='mt-14 text-white w-full'>
        
        {
            allcatcourses.map((item,index)=>{
                return(
                    <div key={index} className='w-full'>
                        
                        {
                            categoryId ===item._id && (
                                <div className='w-full'>
                                    <div className='flex items-center w-full bg-richblack-800 h-[30vh]'>
                                        <div className='w-[80%] mx-auto  text-richblack-500 text-[16px] font-bold  '>
                                           <div className='flex gap-x-2'>
                                            <span>Home /</span>
                                            <span>Catelog /</span>
                                            <span className='text-[17px] text-yellow-50'>{item.name}</span>
                                           </div>
                                            <h1 className='mt-2 text-[28px] text-richblack-25 font-bold'>{item.name}</h1>
                                             <p className='mt-2 text-[15px] text-richblack-500 font-bold'>{item.description}</p>
                                        </div>
                                    </div>
                                    <div className='w-[80%] mx-auto'>
                                        <h1 className='text-[30px] text-richblack-25 font-semibold mt-2 ml-2'>Courses to get you started</h1>
                                        <div className='relative w-full border-b-[1px] border-richblack-500 text-yellow-50 text-[18px] p-2'>
                                           All courses
                                           <div className='flex items-center justify-center w-[50px] h-[50px] rounded-full absolute  bg-richblack-700 opacity-80 top-36 -right-16 '><FiArrowRight color='yellow' size={"1.5rem"}></FiArrowRight></div>
                                       </div>
                                        <div className="flex w-[80vw] overflow-x-auto mt-2 scroll-container mb-3 relative">
                                    
  {item.Course.length <= 0 ? (
    <div className="text-[18px] mt-3 flex items-center gap-x-2">
      <span>No Course Added</span>
      <FaFaceSadCry color="yellow" />
    </div>
  ) : (
    item.Course.map((course, index) => (
        
      <div key={index} className="flex-shrink-0 w-[calc(80vw/3)] p-2 cursor-pointer " onClick={()=>{gototcoursebuy(course._id)}}>
        
        <img src={course.thumbnail} className="w-full h-[250px]" alt={course.courseName} />
        <div className="text-richblack-50 mt-3 text-[19px] font-bold">
          {course.courseName}
        </div>
        <div className="mt-2 flex flex-row gap-x-1 items-center text-[15px] text-richblack-25">
          <span>4.5</span>
          <FaStar color="yellow" />
          <FaStar color="yellow" />
          <FaStar color="yellow" />
          <FaStar color="yellow" />
          <FaStar color="yellow" />
          <span>|</span>
          <span>5 reviews</span>
        </div>
        <div className='mt-3 text-[14px] text-richblack-300 italic underline'>By- {course?.instructor.firstName} {
        " "+course?.instructor.lastName}</div>
        <div className="text-richblack-5 mt-2 text-[20px] font-bold ">
          <span className="text-pink-400">Rs</span> {course.price}
        </div>
      </div>
    ))
  )}
                                         </div>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            })
        }
        <Footer></Footer>
    </div>
  )
}

export default Category
