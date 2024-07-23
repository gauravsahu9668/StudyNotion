import React from 'react'
import HighlighText from './HighlighText'
import knowyourprogress from "../../../Assets/Images/Know_your_progress.png"
import comparewithothers from '../../../Assets/Images/Compare_with_others.png'
import planyourlesson from '../../../Assets/Images/Plan_your_lessons.png'
import CTAButton from './Button'
const LearningLanguageSection = () => {
  return (
  <div className='mt-12 mb-10'>
      <div className='flex flex-col gap-5 w-[100%] items-center'>
        <div className='text-4xl font-semibold text-center'>
           Your Swiss Knife for <HighlighText text={"learning any language"}></HighlighText>
        </div>
        <div className='w-[45%] text-center text-richblack-600 mx-auto text-base mt-3'>
          Using spin making multiple languages easy. with 20+ languages realistic voice-over, progress tracking schedule and more
        </div>
        <div className='flex flex-row items-center mt-5 ml-32 w-[80%]'>
          <img src={knowyourprogress} className='w-[400px]'></img>
          <img src={comparewithothers} className='w-[400px] -ml-20'></img>
          <img src={planyourlesson} className='w-[430px]  -ml-20'></img>
        </div>
        <div className='w-fit'>
          <CTAButton linkto={"/signup"} active={true}>Learn more</CTAButton>
        </div>
      </div>
  </div>
  )
}

export default LearningLanguageSection
