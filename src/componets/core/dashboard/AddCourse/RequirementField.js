import React, { useEffect, useState } from 'react'

const RequirementField = ({name,label,register,errors,setValue,getValues}) => {
    const [requirement,setrequirement]=useState("")
    const [requirelist,setrequirelist]=useState([])

    const handleaddrequirement=()=>{
        if(requirement.trim()!==""){
            setrequirelist([...requirelist,requirement])
            setrequirement("")
        }
    }
    const removerequirement=(index)=>{
        const updatedrequirement=[...requirelist]
        updatedrequirement.splice(index,1)
        setrequirelist(updatedrequirement)
    }
    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length > 0
        })
    })
    // ye bilku bhi samjh nhi aya hai
    useEffect(()=>{
        setValue(name,requirelist)
    },[requirelist,setValue,name])
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor={name} className='text-richblack-50'>{label}<sup>*</sup></label>
        <div className='gap-2'>
           <input type='text' id={name} value={requirement} onChange={(e)=>{setrequirement(e.target.value)}}  className='outline-none w-full p-3 rounded-lg text-[16px] text-richblack-500 bg-richblack-900 border-b-[3px] border-richblack-700'
            ></input>
            <button type='button' onClick={handleaddrequirement} className='mt-2 font-semibold text-yellow-50 items-start'>add</button>
        </div>
       <div>
         {
            requirelist.map((item,index)=>{
                return (
                    <div key={index} className='flex flex-row gap-2 '>
                        <span className='text-[16px] text-richblack-50 font-semibold'>{item}</span>
                        <button type='button' onClick={()=>{removerequirement(index)}} className='text-start text-richblack-400'>clear</button>
                    </div>
                )
            })
         }
        </div>
        {
            errors[name] && (
                <span>{label} is required</span>
            )
        }
    </div>
  )
}

export default RequirementField
