import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const OpenRoute = ({children}) => {
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate()

    useEffect(()=>{
        if(token!==null){
            navigate("/dashboard/my-profile")
        }
    })
    if(token !=null){
        return null
    }
    else {
        return (
            children
        )
    }
}

export default OpenRoute
