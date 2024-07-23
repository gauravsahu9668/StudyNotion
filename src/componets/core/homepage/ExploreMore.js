import React, { useState } from 'react'
import coursesdata from '../../../Data/homepage-explore'
import HighlighText from './HighlighText';
import CourseCard from './CourseCard';
const tabnames=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
const ExploreMore = () => {
    const [currenttab,setcurrenttab]=useState("Free");
    const data=coursesdata
  return (
    <div className='flex flex-col justify-center'>
        <div className='text-4xl font-semibold text-center '>
            Unlock the <HighlighText text={"Power of Code"}></HighlighText>
        </div>
        <p className='text-[16px] text-richblack-200 font-semibold text-center mt-4'>Learn to build anything you can imagine</p>
        <div className=' rounded-full  bg-richblack-800 mx-auto mt-4 p-1 gap-10 w-fit'>
            <button className=' px-4 py-3 text-richblack-300 hover:bg-richblack-900 rounded-full' onClick={()=>{setcurrenttab("Free")}}>Free</button>
            <button className=' px-4 py-3 text-richblack-300 hover:bg-richblack-900 rounded-full' onClick={()=>{setcurrenttab("New to coding")}}>New to coding</button>
            <button className=' px-4 py-3 text-richblack-300 hover:bg-richblack-900 rounded-full' onClick={()=>{setcurrenttab("Skills paths")}}>Skills paths</button>
            <button className=' px-4 py-3 text-richblack-300 hover:bg-richblack-900 rounded-full' onClick={()=>{setcurrenttab("Most popular")}}>Most popular</button>
            <button className=' px-4 py-3 text-richblack-300 hover:bg-richblack-900 rounded-full' onClick={()=>{setcurrenttab("Career paths")}}>Career paths</button>
        </div>
        <div className='flex relative '>
            {
                data.map((cour,index)=>{
                    if(cour.tag===currenttab){
                            return(
                                <CourseCard course={cour.courses} key={index} ></CourseCard>
                            ) 
                    }
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore
