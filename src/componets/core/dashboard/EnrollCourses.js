import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getenrollingcourses } from '../../../services/operation/ProfileAPI';
import ProgressBar from '@ramonak/react-progress-bar'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
const EnrollCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrollcourses,setenrollcourses] = useState([]);
  const dispatch = useDispatch();
  const handler=async()=>{
   const response=await getenrollingcourses(token)
   console.log(response)
   setenrollcourses(response)
   console.log(enrollcourses)
  }
 useEffect(()=>{
    handler()
 },[token])

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-[32px] font-bold text-white mt-3'>Enrolled Courses</div>
      <div>
         {
          !enrollcourses ? (
            <div>Loading....</div>
          ):
          !enrollcourses.length ? (<p className='text-white text-[18px]'>You have not enroll in any courses</p>) :(
            <div className='w-[85%] mx-auto mt-3'>
               <div className='flex flex-row p-3 bg-richblack-800 rounded-md'>
                <p className='w-[60%] text-richblack-50 font-bold '>Course Name</p>
                <p className='w-[25%] text-richblack-50 font-bold pl-3'>Progress</p>
                <p className='w-[15%] text-richblack-50 font-bold  text-right pr-4'>Actions</p>
               </div>
               {/* cards suru honge */}
               {
                enrollcourses.map((course,index)=>{
                 return (
                  <Link to={`/courseview/${course._id}`}>
                      <div className='text-white flex flex-row border-[1px] border-richblack-500 rounded-md' key={index}>
                      <div className='flex flex-row w-[60%] p-2'>
                          <img src={course.thumbnail} width='100px' height='120px' className='rounded-lg'></img>
                          <div className='flex flex-col p-2 gap-1 text-[14px]'>
                            <p className='text-richblack-25 font-bold'>{course.courseName}</p>
                            <p className='text-richblack-500'>{course.courseDescription}</p>
                          </div>
                      </div>
                      <div className='w-[25%] flex  gap-2 p-2 items-center justify-between'>
                          <div className='p-1  flex flex-col w-[70%] gap-2'>
                          <p className='text-richblack-50 text-bold text-[16px]'>Progress 60%</p>
                          <ProgressBar completed="60" height='8px' isLabelVisible={false} maxCompleted={100} ></ProgressBar>
                          </div>
                      </div>
                      <div className='w-[15%] p-2 text-richblack-50 font-semibold my-auto flex justify-around pl-10'>
                      <BsThreeDotsVertical size={'1.5rem'}></BsThreeDotsVertical>
                      < MdDelete size={"1.5rem"}></MdDelete>
                      </div>
                  </div>
                  </Link>
                 )
                })
               }
            </div>
          )
         }
      </div>
    </div>
  );
};

export default EnrollCourses;

