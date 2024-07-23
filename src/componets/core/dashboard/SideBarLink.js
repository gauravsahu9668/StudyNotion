import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { matchPath, matchRoutes, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
const SideBarLink = ({link,iconName}) => {
    const Icon=Icons[iconName]

    const location=useLocation()

    const dispatch=useDispatch()

    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }

  return (
       <Link to={link.path} className={`flex gap-3 text-[17px]  items-center relative w-full px-3 py-4 bg-yellow-800 ${matchRoute(link.path) ? "bg-opacity-100 text-yellow-50":"bg-opacity-0 text-richblack-50"}`}>
        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100":"opacity-0"}`}></span>
        <div className='ml-8'><Icon></Icon></div>
         <span>{link.name}</span>
       
       </Link>
  )
}

export default SideBarLink
