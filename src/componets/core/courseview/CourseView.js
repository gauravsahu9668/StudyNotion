import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { getcoursedetails } from '../../../services/operation/courses'
import { useSelector } from 'react-redux'
import { IoMdArrowBack } from "react-icons/io";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import ReactStars from "react-rating-stars-component"
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { rateandreview } from '../../../services/operation/courses';
import toast from 'react-hot-toast';

const CourseView = () => {
  const location = useLocation()
  const { token } = useSelector((state) => state.auth)
  const courseId = location.pathname.split("/").at(-1)
  const [courses, setcourses] = useState([])
  const [videourl, setvideourl] = useState(null)
  const [desc, setdesc] = useState(null)
  const [downbutton, setdownbutton] = useState(null)
  const [reviewmess, setviewmess] = useState(false)
  const [rating, setRating] = useState(0);
  const [review,setreview]=useState("")
  const {user}=useSelector((state)=>state.profile)
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const reviewHandler = (event) => {
    event.preventDefault();
      rateandreview(token,rating,review,courseId).then((response)=>{
        if(response.data.success){
            setviewmess(false)
        }
        else{
          toast.error(response.data.message)
        }
      })
  };
  const changeHandler=(e)=>{
    setreview(e.target.value)
  }
  const getcoursefulldetails = () => {
    getcoursedetails(courseId, token).then((response) => {
      console.log(response.data.data)
      setcourses(response.data.data)
    })
  }
  useEffect(() => {
    getcoursefulldetails()
  }, [token])

  return (
    <div>
      {courses.map((course, index) => {
        return (
          <>
            {course._id === courseId && (
              <div key={index} className='relative w-full'>
                <div className='w-[280px] h-[calc(100vh-(56px))] bg-richblack-800 mt-[56px] '>
                  <div className='w-full p-2  mt-1 flex flex-row justify-between'>
                    <Link to="/dashboard/enrolled-courses">
                      <button className='w-[30px] h-[30px] rounded-full flex items-center justify-center bg-richblack-400'>
                        <IoMdArrowBack size={"1.5rem"} />
                      </button>
                    </Link>
                    <button onClick={() => { setviewmess(!reviewmess) }} className='px-2 py-1 text-[16px] bg-yellow-50 rounded-lg font-semibold'>Review</button>
                  </div>
                  <div className='mt-2'>
                    {course?.coursecontent.map((section, index) => {
                      return (
                        <div key={index}>
                          <div className='flex items-center justify-between p-2 bg-richblack-700 text-white border-b-[1px] border-richblack-900'>
                            <div className='w-fit'>{section?.sectionName}</div>
                            {downbutton !== section._id ? (
                              <FaAngleDown onClick={() => { setdownbutton(section._id) }} className='cursor-pointer' />
                            ) : (
                              <FaAngleUp onClick={() => { setdownbutton(null) }} className='cursor-pointer' />
                            )}
                          </div>
                          <div className='w-full flex flex-col '>
                            {downbutton === section._id && (
                              section?.subsection.map((small, index) => {
                                return (
                                  downbutton !== null && (
                                    <div key={index} onClick={() => { setvideourl(small?.videoUrl); setdesc(small?.description) }} className='flex flex-row cursor-pointer gap-x-2 items-center relative bg-yellow-800 bg-opacity-50 border-b-[2px] border-richblack-400 text-yellow-200 pl-3'>
                                      <span className='w-[2px] h-full bg-yellow-25 top-0 left-0 absolute'></span>
                                      <IoIosVideocam />
                                      <div className=' p-1  text-[16px]'>{small?.title}</div>
                                    </div>
                                  )
                                )
                              })
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className='absolute w-[80%] h-[500px] top-2 right-3'>
                  {videourl === null ? (
                    <>
                      <div className='text-[25px] text-richblack-25 text-center mt-10'>You can watch the lecture here</div>
                      <div className='text-[16px] text-yellow-25 text-center'>Start playing the lecture videos</div>
                    </>
                  ) : (
                    <video src={videourl} controls className='w-full h-[110%] rounded-lg '></video>
                  )}
                  {desc !== null && (
                    <p className='w-full text-[16px] text-richblack-25 p-2 bg-richblack-800 mt-4 rounded-lg'>{desc}</p>
                  )}
                </div>
                {reviewmess && (
                  <div className='w-full h-[calc(100vh-56px)] bg-richblack-800 bg-opacity-80 absolute top-0 left-0 flex items-center justify-center'>
                    <div className='w-[450px] h-[320px] bg-richblack-900 rounded-lg p-2 '>
                      <div className='flex flex-row items-center justify-center text-richblack-50 gap-2 mt-2 mb-2'>
                        <div ><img src={user?.image}  className='w-[50px] h-[50px]  rounded-full'></img></div>
                        <div>
                          <h1 className='text-yellow-50 text-[17px]'>{user?.firstName}{" " + user?.lastName}</h1>
                          <p className='text-[14px]'>Posting Publicly</p>
                        </div>
                      </div>
                      <form onSubmit={reviewHandler}>
                        <div className='flex flex-row items-center justify-center gap-2'>
                          <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={40} // This sets the size of the container
                            emptyIcon={<MdOutlineStarOutline style={{ fontSize: '30px', margin: '0 5px' }} />}
                            fullIcon={<MdOutlineStarPurple500 style={{ fontSize: '30px', margin: '0 5px' }} />}
                            activeColor="#ffd700"
                          />
                        </div>
                        <textarea onChange={changeHandler} rows={5} placeholder='Add reviews' className='w-full rounded-lg p-2 text-white text-[13px] bg-richblack-800 border-b-[3px] border-richblack-500 outline-none'>
                        </textarea>
                        <div className='w-full flex justify-between mt-2'>
                          <button type='button' onClick={() => { setviewmess(!reviewmess) }} className='text-white text-[16px] px-2 py-1 bg-richblack-500 rounded-lg '>Cancel</button>
                          <button className='text-yellow-50 text-[16px] px-2 py-1 rounded-lg border-[1px] border-yellow-50' type='submit'>Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )
      })}
    </div>
  )
}

export default CourseView
