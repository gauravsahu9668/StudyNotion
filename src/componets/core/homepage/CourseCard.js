import React from 'react'
import { MdPeople } from "react-icons/md";
import { MdPlayLesson } from "react-icons/md";
const CourseCard = ({course}) => {
  return (
    <div className='flex flex-row justify-evenly mt-8 -mb-20'>
      {
        course.map((cour,index)=>{
            return (
                <div className='flex flex-col p-5 w-[25%] pd-5 bg-richblack-800 gap-10'>
                    <div className='flex flex-col gap-3'>
                    <h2 className='text-white'>{cour.heading}</h2>
                    <p className='text-[16px] text-richblack-300 font-semibold'>{cour.description}</p>
                    </div>
                    <div className='flex flex-row p-2 justify-between '>
                        <div className='flex text-[16px] text-richblack-300  font-semibold items-center gap-2'>
                            <MdPeople></MdPeople> {cour.level}</div>
                        <div className='flex text-[16px] text-richblack-300 font-semibold items-center gap-2 '>
                           <MdPlayLesson ></MdPlayLesson> {cour.lessionNumber} Lesson
                        </div>
                    </div>
                </div>
            )
        })
      }
    </div>
  )
}

export default CourseCard
