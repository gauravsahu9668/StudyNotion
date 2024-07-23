
import { createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./authSlice";

const initialState={
  user:null,
  loading:false
}

const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        updateUser (state, action) {
            state.user = { ...state.user, ...action.payload };
        }
    }
})
export const {setUser,updateUser }=profileSlice.actions;
export default profileSlice.reducer