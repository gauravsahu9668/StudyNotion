import React, { useEffect, useState } from 'react'
import { MdClear } from "react-icons/md";
const CourseTagFeild = ({name,label,setValue,getValues,errors,register}) => {
    const [tag,settag]=useState("")
    const [tags,settags]=useState([])

    const addtag=()=>{
        if(tag!==""){
            settags([...tags,tag])
            settag("")
        }
    }
    const removetag=(index)=>{
        const updatedtags=[...tags]
        updatedtags.splice(index,1)
        settags(updatedtags)
    }
    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length > 0
        })
    })
    useEffect(()=>{
        setValue(name,tags)
    },[tags,setValue,name])
  return (
    <div className='flex flex-col gap-2 w-full'>
        <label htmlFor={name} className='text-richblack-50'>{label}</label>
        <div className='flex p-1 gap-2'>
              {
                tags.map((item,index)=>{
                    return(
                        <div key={index} className='flex items-center gap-1 px-2  py-1 rounded-full bg-richblack-200 '>
                            <span>{item}</span>
                            < MdClear onClick={()=>{removetag(index)}} color='black' size={'1.2rem'}></MdClear>
                        </div>
                    )
                })
              }
        </div>
        <div className='flex flex-col gap-2 text-[18px] font-bold'>
        <input type='text' id={name} placeholder='Enter tags'   className=' outline-none w-full p-3 rounded-lg text-[16px] text-richblack-500 bg-richblack-900 border-b-[3px] border-richblack-700'
        onKeyDown={
            (e)=>{if(e.key==='Enter'){ 
                e.preventDefault()
            addtag()
        }
        }} 
        value={tag} onChange={(e)=>{settag(e.target.value)}}></input>
        {
            errors[name] && (
                <span>Add tag field</span>
            )
        }
        </div>
    </div>
  )
}

export default CourseTagFeild
