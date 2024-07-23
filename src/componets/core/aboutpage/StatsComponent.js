import React from 'react'

const States=[
    {
        counts:"5k",
        lebel:"Active Students"
    },
    {
        counts:"10+",
        lebel:"Mentors"
    },
    {
        counts:"200+",
        lebel:"Courses"
    },
    {
        counts:"50+",
        lebel:"Awards"
    }

]

const StatsComponent = () => {
  return (
    <div className='flex text-white w-[80%] justify-around mx-auto'>
        {
            States.map((state,index)=>{
                return(
                    <div key={index} className='p-10 text-center flex flex-col'>
                        <h1 className='text-[25px] font-bold'>{state.counts}</h1>
                        <p className='text-[16px] font-bold text-richblack-500'>{state.lebel}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default StatsComponent
