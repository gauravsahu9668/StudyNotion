import { createSlice } from "@reduxjs/toolkit";

const initialState={
    signupdata:null,
    loading:null,
    token:null
}

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setsignupData(state,value){
            state.signupdata=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setToken(state,value){
            state.token=value.payload
        }
    }
})
export const {setToken,setLoading, setsignupData}=authSlice.actions;
export default authSlice.reducer