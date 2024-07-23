import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SideBar from '../componets/core/dashboard/SideBar'

const DashBoard = () => {
  return (
    <div className='relative flex min-h-[calc(100vh)-3.5rem] mt-14 '>
        <SideBar></SideBar>
        <div className='w-[75%] ml-[280px]'>
        <Outlet></Outlet>
        </div>
    </div>
  )
}

export default DashBoard
