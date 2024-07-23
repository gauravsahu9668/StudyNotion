import React from 'react'
import logo1 from '../../../Assets/TimelineLogo/Logo1.svg'
import logo2 from '../../../Assets/TimelineLogo/Logo2.svg'
import logo3 from '../../../Assets/TimelineLogo/Logo3.svg'
import logo4 from '../../../Assets/TimelineLogo/Logo4.svg'
import timelineimage from '../../../Assets/Images/TimelineImage.png'
const timeline=[
    {
        logo:logo1,
        heading:"Leadership",
        Description:"Fully commetited to success company"
    },
    {
        logo:logo2,
        heading:"Leadership",
        Description:"Fully commetited to success company"
    },
    {
        logo:logo3,
        heading:"Leadership",
        Description:"Fully commetited to success company"
    },
    {
        logo:logo4,
        heading:"Leadership",
        Description:"Fully commetited to success company"
    }
]
const TimeLineSection = () => {
  return (
       <div className='flex flex-row  items-center px-10 mb-[7rem] mt-5'>
          <div className='w-[45%] flex flex-col gap-8 ml-[50px]'>
              {
                timeline.map((element,index)=>{
                    return (
                        <div className='flex gap-3' key={index}>
                            <div className='w-[50px] h-[50px] bg-white flex items-center justify-center'>
                                <img src={element.logo}></img>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>
                        </div>
                    )
                })
              }
          </div>
          <div className='relative shadow-blue-200 mr-5'>
            <img src={timelineimage} alt='timeline image' className='w-[80%] rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'></img>
            <div className='w-[400px] rounded-md absolute bg-caribbeangreen-700 flex flex-row text-white uppercase p-8 right-[200px] bottom-[-30px]'>
                <div className='w-[50%] flex flex-row gap-5 items-center border-r border-caribbeangreen-300 '>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>
                <div className='w-[50%] flex items-center px-7 gap-5'>
                   <p className='text-3xl font-bold'>250</p>
                   <p className='text-caribbeangreen-300 text-sm'>Type of courses</p>
                </div>
            </div>
          </div>
       </div>
  )
}

export default TimeLineSection
