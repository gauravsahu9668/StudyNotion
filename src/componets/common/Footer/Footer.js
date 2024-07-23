import React from 'react'
import logo from "../../../Assets/Logo/Logo-Full-Light.png"
import { IoLogoInstagram } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import FooterLink from './FooterLink';
import {FooterLink2} from "../../../Data/footer-links"
const Footer = () => {
  console.log(FooterLink2)
  return (
    <div className='w-full bg-richblack-800 pt-14 pb-10'>
          <div className='text-white w-[80%] mx-auto grid grid-cols-6'>
              {/* section 1 */}
              <div className='p-2 '>
                <img src={logo}></img>
                <h1 className='text-[16px] text-richblack-400 mt-3'>Company</h1>
                <div className='text-[16px] text-richblack-400 mt-3'>About</div>
                <div className='text-[16px] text-richblack-400 mt-3'>Careers</div>
                <div className='text-[16px] text-richblack-400 mt-3'>Affiliaters</div>
                <div className='flex flex-row  mt-3 gap-x-3'>
                    <FaYoutube size={"1.5rem"}></FaYoutube>
                    <FaGoogle size={"1.5rem"}></FaGoogle>
                    <FaTwitter size={"1.5rem"}></FaTwitter>
                    <IoLogoInstagram size={"1.5rem"}></IoLogoInstagram>
                </div>
              </div>
              {
                 FooterLink2.map((item,index)=>{
                  return (
                    <div key={index} className=' gap-2'>
                        <FooterLink data={item}></FooterLink>
                    </div>
                  )
                })
              }
          </div>
    </div>
  )
}

export default Footer
