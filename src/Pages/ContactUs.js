import React from 'react'
import { MdOutlineMessage } from "react-icons/md";
import ConatctUsForm from '../componets/core/contactpage/ConatctUsForm';
import { FaGlobeAmericas } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
const ContactUs = () => {
  return (
    <div className='w-[70%] mx-auto mt-14 flex justify-between '>
       <div className='text-richblack-500 text-[16px] w-[40%] bg-richblack-800 h-[50vh] mt-10 ml-2 flex flex-col justify-between p-5 rounded-md'>
            <div className=''>
                    <div className='flex flex-row items-center gap-3'><MdOutlineMessage color='white'></MdOutlineMessage> <h1 className='text-[20px] font-bold text-white'>Chat on Us</h1></div>
                    Our friendly team is here to help.
                    <br></br>
                    <span>info@studynotion.com</span>
            </div>
            <div>
                    <div className='flex flex-row items-center gap-3'><FaGlobeAmericas color='white'></FaGlobeAmericas> <h1  className='text-white text-[20px] font-bold'>Visit Us</h1></div>
                    Come and say hellow at our office HQ.
                    <br></br>
                    <span>Banglore-500016</span>
            </div>
            <div>
                    <div className='flex flex-row items-center gap-3'>< IoCall color='white' ></IoCall><h1  className='text-white text-[20px] font-bold'>Call Us</h1></div>
                    Mon-fri from 8am to 5pm
                    <br></br>
                    <span>+123 456 7890</span>
            </div>
       </div>
       <div className='flex flex-col gap-3 mt-16'>
        <h1 className='text-[32px] text-white font-bold'>Got a Idea? We've got the skills.<br></br> Let's team up</h1>
        <p className='text-richblack-500 text-[16px] mb-6 font-bold'>Tell me more about yourself and what you're not in mind</p>
        <ConatctUsForm></ConatctUsForm>
       </div>
    </div>
  )
}

export default ContactUs
