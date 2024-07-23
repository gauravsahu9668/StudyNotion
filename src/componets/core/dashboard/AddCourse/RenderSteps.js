import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheckCircle } from "react-icons/fa";
import CourseBuilder from './CourseBuilder';
import CourseInformation from './CourseInformation';
import CoursePublish from './CoursePublish';
const RenderSteps = () => {
  const {step}=useSelector((state)=>state.course)
    const steps=[
        {
            id:1,
            title:"Course Information"
        },
        {
          id:2,
          title:"Course Builder"
        },
        {
          id:3,
          title:"Publish"
        }
  ]
  return (
    <div className='flex flex-col w-full gap-4'>
         <div className='flex  items-center pl-24 mt-2 '>
         {
            steps.map((item)=>{
              return (
                <div className='flex items-center'>
                  <div className={`${step ===item.id ?("bg-yellow-900 border-[2px] border-yellow-50 text-yellow-50"):
                  ("border-richblack-700 bg-richblack-800 text-richblack-300")} w-[50px] h-[50px] flex items-center justify-center rounded-full text-[18px]`}>
                  {
                    step>item.id ?(<FaCheckCircle color='yellow'></FaCheckCircle>):(<span>{item.id}</span>)
                  }
                  </div>
                  <span>{item.id===3 ?(<></>):(<div  className={`${step>item.id ?("text-yellow-50"):("text-richblack-600")} w-[160px] border-[1px] border-dashed`}></div>)}</span>
                </div>
              )
            })
          }
         </div>
         <div className='flex gap-[100px] items-center text-richblack-50 text-[16px] pl-16  font-bold mt-2'>
          {
            steps.map((item)=>{
              return(
                <div>
                  <p>{item.title}</p>
                </div>
              )
            })
          }
         </div>
         <div className='mt-3'>
            {step===1 && (<CourseInformation></CourseInformation>)}
            {
              step===2 && (<CourseBuilder></CourseBuilder>)
            }
            {
              step===3 && (<CoursePublish></CoursePublish>)
            }
         </div>
    </div>
  )
}

export default RenderSteps
