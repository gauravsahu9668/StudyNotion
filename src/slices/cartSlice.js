
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState={
   cart:localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):[],
   totalItems:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
   total:localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,

}

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state,action){
            state.totalItems=action.payload
        },
        // add to cart
        addToCart(state,action){
            const course=action.payload
            const index=state.cart.findIndex((item)=>item._id===course._id)
            if(index>=0){
                toast.error("Course already in cart")
                return
            }
            state.cart.push(course)
            state.totalItems++
            state.total+=course.price
            toast.success("Course added successfully")
        },
        removeFromCart(state,action){
            const courseId=action.payload
            const index=state.cart.findIndex((item)=>item._id===courseId)
            if(index>=0){
                state.totalItems--
                state.total-=state.cart[index].price
                state.cart.splice(index,1)
            }
        }
        // resetcart
    }
})
export const {setTotalItems}=cartSlice.actions;
export default cartSlice.reducer