import React, { useState } from 'react'

const LogerType = ({accountType,setAccountType}) => {
  return (
    <div className='flex flex-row w-fit p-1 bg-richblack-800 rounded-full gap-3 mt-10 mb-5  border-b-[3px] border-richblack-700'>
        <button onClick={()=>{setAccountType("Student")}} className={accountType!=="Student" ? ("px-3 py-2 bg-richblack-800 font-bold text-richblack-600 rounded-full"):("px-3 py-2 bg-richblack-900 text-white text-lf font-semibold rounded-full")}>Student</button>
        <button onClick={()=>{setAccountType("Instructor")}} className={accountType!=="Instructor" ? ("px-3 py-2 bg-richblack-800 font-bold text-richblack-600 rounded-full"):("px-3 py-2 bg-richblack-900 text-white text-lf font-semibold rounded-full")}>Instructor</button>
      </div>
  )
}

export default LogerType
