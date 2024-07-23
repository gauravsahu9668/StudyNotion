import React from 'react'
import learningarray from '../../../Data/learningarray'
import HighlighText from '../homepage/HighlighText'
import CTAButton from '../homepage/Button'
const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 text-white w-[80%] mt-20'>
       {
         learningarray.map((card,index)=>{
              return (
                <div className={`${index===0 && "lg:col-span-2 bg-richblack-900 "} ${card.order %2===1 ? "bg-richblack-700":"bg-richblack-800"}
                ${card.order===3 && "lg:col-start-2"}`} key={index}>
                  {
                    card.order<0 ?(
                      <div className='flex flex-col items-start justify-start gap-3'>
                        <div className='w-[80%] text-start text-[30px] font-bold'>
                          {card.heading}
                          <br></br>
                          <span className='text-blue-200'>{card.highlighttext}</span>
                        </div>
                        <div className='w-[90%] text-lg text-richblack-500'>{card.description}</div>
                        <div>
                          <CTAButton linkto={card.Btnlink} active={true}>
                            {card.Btntext}
                          </CTAButton>
                        </div>
                      </div>
                    ):(
                      <div className='flex flex-col p-5 gap-4 py-10 pb-28'>
                        <h1 className='text-richblack-50 font-bold'>{card.heading}</h1>
                        <p className='text-richblack-500 font-bold text-[16px]'>{card.description}</p>

                      </div>
                    )
                  }
                </div>
              )
         })
       }
    </div>
  )
}

export default LearningGrid
