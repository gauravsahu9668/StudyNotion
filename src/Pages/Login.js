import React from 'react'
import LoginForm from '../componets/core/auth/LoginForm'
import HighlighText from '../componets/core/homepage/HighlighText'
import loginimage from '../Assets/Images/login.webp'
import frame from '../Assets/Images/frame.png'
const Login = () => {
  return (
    <div className='w-[80%] mx-auto flex flex-row items-start p-3 gap-4 h-full mt-16'>
        <div className='w-[40%] flex flex-col mt-8 inputbox'>
            <h1 className='text-4xl text-white font-bold'>Welcome Back</h1>
            <div className='flex flex-row text-lg mt-2'>
                <p className='text-lg font-bold  text-richblack-600'>
                    build skills for today, tommorrow, and beyond.<span className='italic text-lg cursivekrna font-semibold text-caribbeangreen-300'><HighlighText text={"Education to future-proof your success"}></HighlighText></span>
                </p>
            </div>
            <LoginForm></LoginForm>
        </div>
        <div className='flex flex-row items-center mx-auto imagebox p-2'>
            <div className=' flex relative w-[100%]'>
            <img src={loginimage} className='z-10 rounded-lg'></img>
            <img src={frame} className='absolute left-5 top-5 z-0 rounded-lg'></img>
            </div>
        </div>
    </div>
  )
}

export default Login
