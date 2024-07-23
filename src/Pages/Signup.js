import React from 'react'
import LoginForm from '../componets/core/auth/LoginForm'
import HighlighText from '../componets/core/homepage/HighlighText'
import loginimage from '../Assets/Images/signup.webp'
import frame from '../Assets/Images/frame.png'
import SignupForm from '../componets/core/auth/SignupForm'
const Signup = ({accountType,setAccountType}) => {
  return (
    <div className='w-[80%] mx-auto flex flex-row items-start p-3 gap-4 h-full mt-16'>
        <div className='w-[40%] flex flex-col mt-8 signupinput'>
            <h1 className='text-[30px] text-white font-bold'>Join the millions learning to code with StudyNotion for free</h1>
            <div className='flex flex-row text-lg mt-2'>
                <p className='text-lg font-bold  text-richblack-600'>
                    build skills for today, tommorrow, and beyond.<span className='cursivekrna text-lg italic font-semibold text-caribbeangreen-300'><HighlighText text={"Education to future-proof your success"}></HighlighText></span>
                </p>
            </div>
            <SignupForm  accountType={accountType} setAccountType={setAccountType}></SignupForm>
        </div>
        <div className='flex flex-row items-center mx-auto  p-2 signupimage'>
            <div className=' flex relative w-[100%]'>
            <img src={loginimage} className='z-10 rounded-lg'></img>
            <img src={frame} className='absolute left-5 top-5 z-0 rounded-lg'></img>
            </div>
        </div>
    </div>
  )
}

export default Signup