import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import cartReducer from '../slices/cartSlice'
import profileReducer from '../slices/profileSlice'
import viewCourseReducer from '../slices/viewCourse'
import courseReducer from '../slices/courseSlice'
const rootReducer=combineReducers({
    auth:authReducer,
    cart:cartReducer,
    profile:profileReducer,
    viewCourse:viewCourseReducer,
    course:courseReducer
})
export default rootReducer