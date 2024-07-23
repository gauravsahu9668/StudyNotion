import React, { useEffect, useState } from 'react'
import logo from "../../Assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from '../../Data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropdown from '../core/auth/ProfileDropdown'
import { apiconnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdown } from 'react-icons/io'
const Navbar = () => {


  const {token}=useSelector((state)=>state.auth)
  const {user}=useSelector((state)=>state.profile)
  const {totalItems}=useSelector((state)=>state.cart)


  const [sublink,setlink]=useState([]);
  const fetchsublinks = async()=>{
      try{
       const  result=await apiconnector("GET",categories.CATEGORIES_API)
        console.log(result.data.data)
        setlink(result.data.data)
      }catch(error){
        console.log("could not fetch the category list")
      }
  }
  useEffect(()=>{
     fetchsublinks()
     console.log(sublink)
  },[])




  const location=useLocation();
  const matchroute=(route)=>{
     return matchPath({path:route},location.pathname)
  }





  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='w-11/12 flex  max-w-maxContent items-center justify-between'>
         <Link to='/'>
         <img src={logo} width={160} height={130}></img>
         </Link>
         <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
               {
                 NavbarLinks.map((link,index)=>{
                  return (
                    <li key={index}>
                        {
                            link.title==="Catalog"? (
                              <div className='flex items-center gap-2 group relative'>
                                <p>{link.title}</p>
                                <IoIosArrowDropdown></IoIosArrowDropdown>
                                <div className='invisible absolute -left-[115%] top-[150%] flex flex-col rounded-md bg-richblack-5
                                 text-richblack-900 opacity-0 
                                transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px]'>
                                  <div className='absolute left-[50%] -top-1 h-6 w-6 rotate-45 bg-richblack-5 z-0'></div>
                                  <div className='flex flex-col px-3  pt-7 pb-3 text-black text-lg   gap-2 bg-richblack-5 rounded-md'>
                                  {
                                    sublink.length >0 ? (
                                      
                                        sublink.map((link,index)=>{
                                          return (<div className='w-full text-start p-2  hover:bg-richblack-50 rounded-md'>
                                            <Link to={`/catelog/${link._id}`} key={index}>
                                            {link.name}
                                          </Link>
                                          </div>
                                          )
                                        })
                                    ):(<div></div>)
                                  }
                                  </div>
                                </div>
                              </div>
                            ):(
                                <Link to={link?.path}>
                                   <p className={matchroute(link?.path)? ("text-yellow-25"):("text-richblack-25")} >{link.title}</p>
                                </Link>
                            )
                        }
                    </li>
                  )
                 })
               }
            </ul>
         </nav>
         {/* Login/Signup/dashboard*/}
         <div className='flex gap-x-5 items-center '>
             {
                user && user?.accountType !="Instructor" && (
                  <Link to='/dashboard/cart' className='relative text-richblack-25'>
                    <AiOutlineShoppingCart size={'2rem'} ></AiOutlineShoppingCart>
                    {
                      totalItems>0 && (
                        <div className='absolute bg-richblack-900 text-yellow-25 rounded-full w-[15px] h-[15px] flex items-center justify-center -top-1 left-3'>
                          {totalItems}
                        </div>
                      )
                    }
                  </Link>
                )
             }
             {
              token===null && (
                <Link to="login">
                  <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                    Login in
                  </button>
                </Link>
              )
             }
             {
              token===null && (
                <Link to="/signup">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                  Sign Up
                </button>
                </Link>
              )
             }
             {
              token!==null && (
                <ProfileDropdown></ProfileDropdown>
              )
             }
         </div>
      </div>
    </div>
  )
}

export default Navbar
