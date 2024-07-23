import React from 'react'
import HighlighText from '../homepage/HighlighText'

const Quote = () => {
  return (
    <div className='w-[75%] text-center mx-auto text-[30px] text-white font-bold'>
        We are passinate about revolutionizing the way we learn. Our innovative platform, 
        <span className='text-blue-100'>Combine technology</span>
        <span className='text-yellow-200'>
            {" "}
            experties
        </span>
        , and community to create an
        <span>
            unparalleled educational experience
        </span>
    </div>
  )
}

export default Quote
