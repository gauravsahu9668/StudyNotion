import React from 'react'
import CTAButton from './Button'
import HighlighText from './HighlighText'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundgradient,codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-8 px-10 mx-7 codeblock w-[100%]`}>
        <div className='w-[50%] flex flex-col gap-8 codeblock1'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btntext}
                        <FaArrowRight></FaArrowRight>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btntext}
                </CTAButton>
            </div>
        </div>
        {/* section 2 krna hai jisme code blocks bnaunga me */}
        <div className='h-fit flex flex-row text-[15px] w-[50%] py-4 px-4  rounded-md bg-richblack-800 codeblock2'>
            {/* gradient create krna hai  */}
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[450px] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 codeblock3 `}>
              <TypeAnimation
              sequence={[codeblock,5000,""]}
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
              style={
                {
                    whiteSpace:"pre-line",
                    display:"block"
                }
              }
              />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks
