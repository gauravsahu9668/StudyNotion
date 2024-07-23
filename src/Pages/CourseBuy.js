import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getcoursedetails } from '../services/operation/courses'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdTime } from "react-icons/io";
import { MdArrowDropDown } from 'react-icons/md';
import { FaRegShareSquare } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';
import { addedtocart } from '../services/operation/courses';
import toast from 'react-hot-toast';
import { setTotalItems } from '../slices/cartSlice';
import { buyCourse } from '../services/operation/courses';
import Footer from '../componets/common/Footer/Footer';
const CourseBuy = () => {
    const location=useLocation()
    const courseId=location.pathname.split("/").at(-1)
    const {token}=useSelector((state)=>state.auth)
    const [Course,setCourse]=useState([]) 
    const getcourseDetails=()=>{
        getcoursedetails(courseId,token).then((result)=>{
            setCourse(result.data.data)
        })
    }
    const {totalItems}=useSelector((state)=>state.cart)
    const dispatch=useDispatch()
    const addtocart=(Course_Id)=>{
      console.log("step-1")
      addedtocart(Course_Id,token).then((response)=>{
          if(response.data.success){
            dispatch(setTotalItems(totalItems+1))
          }
          console.log(response)
        
      })
    }
    const buyHandler=(courseId)=>{
      buyCourse(courseId,token).then((response)=>{
        console.log(response)
      })
    }
    useEffect(()=>{
        getcourseDetails()
    },[])
  return (
    
    <div className='w-full'>
        {
            Course.map((item,index)=>{
                return(
                    <>{
                     item._id===courseId && (<div className='w-full bg-richblack-800 mt-14 h-[50vh]'>
                          
                             
                                <div className='w-[80%] mx-auto relative pt-12 '>
                                  <div className=' flex flex-col gap-y-1 '>
                                    <h1 className='text-richblack-5 text-[30px] font-bold'>{item.courseName}</h1>
                                    <div className='text-richblack-200 text-[16px]'>
                                                         {item.tag.split(',')}
                                    </div>
                                    <div className='text-richblack-25 flex items-center text-[18px] gap-3'>
                                       <div className=" flex flex-row gap-x-1 items-center text-[15px] text-richblack-25">
                                 <span>4.5</span>
                              <FaStar color="yellow" />
                           <FaStar color="yellow" />
                           <FaStar color="yellow" />
                              <FaStar color="yellow" />
                              <FaStar color="yellow" />
                              <span>|</span>
                              <span>5 reviews</span>
                                        </div>
                                     <div className='text-richblack-100'>{item.studentsenroll.length} student enroll</div>
                                    </div>
                                    
                                    <p className='flex items-center gap-1 text-richblack-25 text-[18px] '><IoMdTime ></IoMdTime> <span>Created on {item.time}</span></p>
                                  </div>
                                  <div className='flex flex-col gap-2 mb-5 mt-5'>
                                   <div className='text-[18px] text-pink-200 font-bold'>Author</div>
                                   <div className='flex flex-row gap-x-3 items-center'>
                                    <div className=''><img src={item?.instructor?.image}  className='w-[60px] h-[60px] rounded-full'></img></div>
                                    <div className='text-[18px] text-richblack-300'>{item?.instructor?.firstName}{" "+item?.instructor?.lastName}</div>
                                   </div>
                                  </div>
                                  <div className='flex flex-col absolute top-6 right-0 w-[30%] h-[65vh] bg-richblack-700 mt-10 rounded-sm p-2'>
                             <img src={item?.thumbnail}  height={'200px'} className='w-fit h-[50%] rounded-lg'></img>
                             <h1 className='text-[30px] text-richblack-5 font-bold mt-2'>Rs {item?.price}</h1>
                             <button type='button' onClick={()=>{buyHandler(item._id)}} className='w-full p-2 text-[16px] text-black font-bold mt-4 bg-yellow-100 rounded-lg'>Buy Now</button>
                             <button  className='w-full p-2 text-[16px] text-white font-bold mt-4 bg-richblack-800 rounded-lg' onClick={()=>{addtocart(item._id)}}>Add to Cart</button>
                             <div className=' text-[17px] text-yellow-50 flex items-center justify-center gap-x-2 mt-5'>< FaRegShareSquare ></FaRegShareSquare><span>Share</span></div>
                                  </div>
                                </div>   
                            
                          
                     </div>)
                       }{
                        item._id===courseId && (
                        <div className='w-[80%] mx-auto'>
                            <div className='border-[1px] w-[62%] border-richblack-500 rounded-lg p-4 mt-10'>
                                     <h1 className='text-[30px] text-richblack-25 font-bold'>What you'll learn</h1>
                                     <p className='text-[18px] text-richblack-500'>{item.courseDescription}</p>
                                 </div>
                            <div className='flex flex-col gap-3 mt-3 w-[62%] '>
                            <h1 className='text-[23px] text-richblack-25 font-bold'>Course Content</h1>
                            <div className='flex justify-between text-[16px] text-richblack-100'>
                              <div>{item.coursecontent.length} sections 2hrs 30min</div>
                              <div className='text-yellow-50'>collapse all sections</div>
                            </div>
                            </div>
                            <div className='flex flex-col p-3 rounded-lg w-[62%] bg-richblack-800 mt-3 gap-y-2'>{
                                     item.coursecontent.map((it,index)=>{
                                    return (
                                        
                                         <div key={index} className='text-[16px] p-1 text-richblack-50 bg-richblack-900 rounded-md '>{it.sectionName}</div>
                                     
                                    )
                                  })
                                     }
                             </div>
                            
                        </div>
                        )
                       }
                        
                    </>
                )
                    
             })
        }
       <div className='mt-5'>
       <Footer></Footer>
       </div>
    </div>
  )
}

export default CourseBuy
