import React, { useState } from 'react'
const UploadThumbNail = ({name,register,watch,setValue,geValues,label,errors}) => {
  return (
    
        <div className='flex flex-col gap-2 text-[18px] font-bold'>
        <label htmlFor={name}>{label}</label>
        <input className='outline-none w-full p-3 rounded-lg text-[16px] text-richblack-500 bg-richblack-900 border-b-[3px] border-richblack-700' type='file' id={name}  placeholder='Upload Thumbnail' {...register(name,{required:true})}></input>
        </div>
  )
}

export default UploadThumbNail
