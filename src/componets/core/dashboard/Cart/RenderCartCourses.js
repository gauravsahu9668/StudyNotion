import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from 'react-icons/ri';
import  { setTotalItems } from '../../../../slices/cartSlice'
import { allcartDetails } from '../../../../services/operation/courses';
import { Link } from 'react-router-dom';
import { setCourse } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { removeFromCart } from '../../../../services/operation/courses';
const RenderCartCourses = () => {

    const [cart,setcart]=useState([])
    const {token}=useSelector((state)=>state.auth)
    const {totalItems}=useSelector((state)=>state.cart)
    const dispatch=useDispatch()
    const getCartItems=()=>{
        allcartDetails(token).then((response)=>{
            console.log(response.data.data)
            setcart(response.data.data)
            console.log(response.data.data.length)
            dispatch(setTotalItems(response.data.data.length))
        })
        
    }
    const removeHandler=(courseId)=>{
        removeFromCart(token,courseId).then((response)=>{
            if(response.data.success){
                setcart(response.data.data)
                toast.success("Course removed successfully")
                dispatch(setTotalItems(totalItems-1))
            }
        })
    }
    useEffect(()=>{
        console.log("step-1")
        getCartItems()
    },[])
  return (
    <div className='w-full pb-5'>
       
        {
            totalItems>0 ? (
                <div className='w-full grid grid-cols-3 pb-3  gap-3'>
                    {
        cart.map((course,index)=>{
            return (
                <div className='p-3 border-[0.2px] border-richblack-500  rounded-lg hover:bg-richblack-800 hover:scale-90 transition-all duration-200 group'>
                    <img src={course.thumbnail} className='w-fit h-[250px] rounded-lg'></img>
                    <div className='text-[20px] text-richblack-25 font-semibold mt-3'>{course.courseName}</div>
                    <div className='text-richblack-500 italic mt-3'>By-<span className='underline '>{course.instructor.firstName}{" "+course.instructor.lastName}</span></div>
                    <div className='text-[23px] text-richblack-50 font-bold mt-3'>Rs {course.price}</div>
                    <div className='flex flex-row  justify-between mt-2'>
                        <Link to={`/course-buy/${course._id}`}>
                        <button className=' px-3 py-2 border-[1px] border-yellow-50 text-yellow-50 rounded-full'>Buy Now</button>
                        </Link>
                         <button onClick={()=>{removeHandler(course._id)}} className=' px-3 py-2 text-richblack-25 rounded-full bg-richblack-800 transition-all duration-200 group-hover:bg-richblack-900'>Remove</button>
                    </div>
                </div>
            )
        })
       }
                </div>
            ):(
                <div className='flex  text-center text-[25px] text-richblack-100 w-fit mx-auto'>Your cart is empty</div>
            )
        }
        
       
    </div>
  )
}

export default RenderCartCourses

