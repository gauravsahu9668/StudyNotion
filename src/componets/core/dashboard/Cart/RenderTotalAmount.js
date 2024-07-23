import React from 'react'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {
    const {total}=useSelector((state)=>state.cart)

    const buynowhandler=()=>{
     console.log("bad me khridenge sabhi ko")
     //TODO;api jo hme payment gatway tk le jayegi
    }
  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>
      <button onClick={buynowhandler}>
          Buy Now
      </button>
    </div>
  )
}

export default RenderTotalAmount
