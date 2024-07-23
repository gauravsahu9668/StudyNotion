import { createSlice } from "@reduxjs/toolkit";



const viewCourseSlice=createSlice({
    name:"viewCourse",
    initialState:{
        courseSectionData:[],
        courseEntireData:[],
        copletedLectures:[],
        totalNoOfLectures:[]
    },
    reducers:{
        setCourseSectionData:(state,action)=>{
            state.courseSectionData=action.payload
        },
        setEntireCourseData:(state,action)=>{
            state.courseEntireData=action.payload
        },
        setTotalNoOfLectures:(state,action)=>{
            state.totalNoOfLectures=action.payload
        },
        setCompletedLectures:(state,action)=>{
            state.copletedLectures=action.payload
        },
        updateCompletedlectures:(state,action)=>{
            state.copletedLectures=[...state.copletedLectures,action.payload]
        }
    }
})

export const { setCourseSectionData,setEntireCourseData,setTotalNoOfLectures,setCompletedLectures
    ,updateCompletedlectures
}=viewCourseSlice.actions
export default viewCourseSlice.reducer