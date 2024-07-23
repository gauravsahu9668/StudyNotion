import React from 'react'
import RenderSteps from './RenderSteps'
import { RxDotFilled } from "react-icons/rx";
import { BsLightningChargeFill } from "react-icons/bs";
const AddCourse = () => {
  return (
        <div className='flex flex-col gap-3 w-full'>
            <h1 className='text-white text-[30px] font-bold mt-5 ml-4'>Add Course</h1>
            <div className='flex flex-row gap-2 relative '>
              <div className='w-[63%] p-2'>
                <RenderSteps></RenderSteps>
              </div>
              <div className='text-white w-[25%] min-h-[300px]  p-2 bg-richblack-800 rounded-lg fixed right-20'>
                 <div className='pl-4 mb-3 flex gap-2 items-center'>
                  <BsLightningChargeFill color='yellow'></BsLightningChargeFill>
                  <h1 className='text-[23px] text-richblack-50 font-bold'>Course Instructions</h1>
                 </div>
                <div className=' flex-col gap-6 text-[14px] text-richblack-100 list p-2'>
                    <span className='flex'><RxDotFilled ></RxDotFilled> Get the course price action or make it free</span>
                     <span className='flex'><RxDotFilled ></RxDotFilled>Standard size for the course thumbnail is 1024*578</span>
                     <span className='flex'><RxDotFilled ></RxDotFilled>Video section controls the course overview video</span>
                     <span className='flex'><RxDotFilled ></RxDotFilled>Course builder is whether you create & organize a course</span>
                    <span className='flex'> <RxDotFilled ></RxDotFilled>Information from the Additonal Data section shows up on the course single page</span>
                     <span className='flex'><RxDotFilled ></RxDotFilled>make announcement to notify any important</span>
                     <span className='flex'><RxDotFilled ></RxDotFilled>Course builder is whether you create & organize a course</span>
                     <span className='flex'><RxDotFilled ></RxDotFilled>Information from the Additonal Data section shows up on the course single page</span>
                     <span className='flex'><RxDotFilled ></RxDotFilled>make announcement to notify any important</span>
                </div>
              </div>
            </div>
        </div>
  )
}

export default AddCourse
