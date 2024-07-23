import React, { useEffect, useState } from 'react'
import { getallreviews } from '../../services/operation/courses'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarRatings from 'react-star-ratings';
const ReviewSlider = () => {
    const [allreviews,setallreviews]=useState([])
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
    };
    useEffect(()=>{
        getallreviews().then((response)=>{
            setallreviews(response.data.data)
        })
    },[])
  return (
    <Slider {...settings} className='mb-10 gap-3 mt-5'>
        {
          allreviews.map((review,index)=>{
            return (
              <div key={index} className='w-[30%]  m-2 p-2 flex flex-col justify-center rounded-lg bg-richblack-800 border-r-[20px]  border-richblack-900 '>
                   <img src={review?.user?.image} className='w-[55px] h-[55px] rounded-full mx-auto'></img>
                   <div className='w-full text-center text-richblack-100 text-[16px]'>{review?.user?.firstName}{" "+review?.user?.lastName}</div>
                   <div className='w-full text-center text-richblack-300 text-[13px]'>{review?.user?.email}</div>
                   <div className='flex flex-row gap-2 text-center items-center'>
                      <div className='w-fit mx-auto mt-2'>
                      <StarRatings
                         rating={review?.rating}
                         starRatedColor="gold"
                         starHoverColor="gold"
                         numberOfStars={5}
                         starDimension="20px"
                         starSpacing="5px"
                        name={`rating-${index}`}
                      />
                      </div>
                   </div>
                   <div className='p-2 w-full min-h-[120px] text-center mt-2'>{review?.reviews}</div>
              </div>
            )
          })
        }
    </Slider>
  )
}

export default ReviewSlider
