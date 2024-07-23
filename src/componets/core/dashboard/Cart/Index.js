import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Cart = () => {

    const {total,totalItems}=useSelector((state)=>state.cart)

  return (
    <div className=' flex flex-col gap-3'>
        <h1 className='text-richblack-50  text-[32px] font-bold mt-3 '>My Wishlist</h1>
        <p className='text-yellow-5 text-[19px] font-bold '>{totalItems} Courses in Cart</p>
        <div>
          <RenderCartCourses></RenderCartCourses>
        </div>
    </div>
  )
}

export default Cart
