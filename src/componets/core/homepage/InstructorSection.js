import React from 'react'
import instructor from '../../../Assets/Images/Instructor.png'
import HighlighText from './HighlighText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='mt-10'>
      <div className='flex flex-row gap-20 items-center'>
        <div className='w-[50%] p-7'>
            <img src={instructor} className='shadow-white'></img>
        </div>
        <div className='w-[50%] flex flex-col gap-7'>
            <div className='text-4xl w-[50%] font-semibold'>
                Become an <HighlighText text={"Instructor"}></HighlighText>
            </div>
            <p className='font-md text-[16px] text-richblack-300 w-[80%]'>Instructor from around the world teach millions of the student on StudyNotion. We provide the tools and skills to teach what you love</p>
            <div className='w-fit'>
            <CTAButton active={true} linkto={'/signup'}>
                   <div className='flex items-center gap-2'>
                     <p>Start learning today</p> <FaArrowRight></FaArrowRight>
                   </div>
            </CTAButton>
            </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
