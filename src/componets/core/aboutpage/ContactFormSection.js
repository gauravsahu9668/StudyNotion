import React from 'react'
import ConatctUsForm from '../contactpage/ConatctUsForm'
const ContactFormSection = () => {
  return (
    <div className=' flex flex-col gap-5 w-[80%] mx-auto'>
       <h1 className='text-[32px] text-white font-bold text-center'>Get in Touch</h1>
       <p className='text-richblack-500 text-[16px] text-center font-bold'>We'd love to here for you, Please fill out this form</p>
       <div className='text-white w-[40%] mx-auto'>
        <ConatctUsForm></ConatctUsForm>
       </div>
    </div>
  )
}

export default ContactFormSection
