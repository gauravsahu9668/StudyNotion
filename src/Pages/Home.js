import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlighText from '../componets/core/homepage/HighlighText'
import CTAButton from '../componets/core/homepage/Button'
import banner from '../Assets/Images/banner.mp4'
import CodeBlocks from '../componets/core/homepage/CodeBlock'
import TimeLineSection from '../componets/core/homepage/timelinesection'
import LearningLanguageSection from '../componets/core/homepage/learnlangugesection'
import InstructorSection from '../componets/core/homepage/InstructorSection'
import ExploreMore from '../componets/core/homepage/ExploreMore'
import Footer from '../componets/common/Footer/Footer'
import ReviewSlider from '../componets/common/ReviewSlider'
const Home = () => {
  return (
    <div>
    {/*sectiom1  */}
    <div className='group relative mx-auto flex flex-col w-11/12 mt-8 items-center text-white justify-between'>
        <Link to="/signup">
        <div className='-z-50 mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200
        hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                <p>Become an Instructor</p>
                <FaArrowRight></FaArrowRight>
            </div>
        </div>
        </Link>
        <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your Future with <HighlighText text={"Coding skills"}></HighlighText>
        </div>
        <div className='w-[65%] text-center text-lg font-bold text-richblack-300 mt-4'>
            with our online courses,you can learn at your own pace,from anywhere in the world,and get success to a wealth of resourses,including hands-on projects,quizzes,and personalized feedback from instructors.
        </div>
        <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
                Book a Demo
            </CTAButton>
        </div>
        <div className='shadow-blue-200 mx-3 my-12'>
            <video muted loop autoPlay src={banner} className='w-[90%] mx-auto'>
            </video>
        </div>
        <div className=''>
            <CodeBlocks
            position={"lg:flex-row"}
            heading={<div className='text-4xl font-semibold'>
                Unlock Your <HighlighText text={"coding potential"}></HighlighText>  with our online courses
            </div>}
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passinate about sharing their knowledge with you"}
            ctabtn1={
                {
                    active:true,
                    linkto:"/signup",
                    btntext:"Try it yourself"

                }
            }
            ctabtn2={
                {
                    active:false,
                    linkto:"/login",
                    btntext:"Learn more"
                }
            }
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n <meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n <title>Document</title>\n</head>`}
            codeColor={"text-yellow-25"}
            />
        </div>
        <div className='pr-4'>
            <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={<div className='text-4xl font-semibold'>
                Start <HighlighText text={"coding in seconds"}></HighlighText> with our platform
            </div>}
            subheading={"Go ahead, give it a try.our hand-on learning enviroment means you'll be writing real code from your first lesson"}
            ctabtn1={
                {
                    active:true,
                    linkto:"/signup",
                    btntext:"Continue Lesson"
                }
            }
            ctabtn2={
                {
                    active:false,
                    linkto:"/login",
                    btntext:"Learn more"
                }
            }
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n <meta charset="UTF-8">\n<meta name="viewport" content="width=device-width">\n <title>Document</title>\n</head>\n<body>\n<h1>hellow learners</h1>\n</body>`}
            codeColor={"text-pink-400"}
            />
        </div>
        <div className='w-[100%] px-24'>
            <ExploreMore>
            </ExploreMore>
        </div>
    </div>
    {/* section 2 */}
    <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[200px]'>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                 <div className='flex flex-row gap-7 text-white mt-[120px]'>
                    <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                       Explore full Catalog
                       <FaArrowRight></FaArrowRight>
                    </div>
                    </CTAButton>
                    <CTAButton active={false} linkto={"/signup"}>
                    Learn more
                    </CTAButton>

                 </div>
            </div>
        </div>    
        <div className='mx-auto w-11/12 max-w-maxContent flex  items-center'>
            <div className=' flex flex-row gap-20 mb-10 mt-[150px] jobskill'>
                <div className='text-4xl font-semibold w-[45%] jobskill1'>
                    Get the skills you need for a <HighlighText text={"job that in demand"}></HighlighText>
                </div>
                <div className='flex flex-col gap-10 w-[40%] items-start jobskill2'>
                <div className='text-[16px]'>
                    The modern StudyNotion is the dictates its own terms. Today, to be a comptitive speciaList requires more than professional skills
                </div>
                <CTAButton active={true} linkto={"/signup"}>
                Learn more</CTAButton>
                </div>
            </div>
        </div>
        <div className='flex flex-col w-11/12 mx-auto '>
        <TimeLineSection></TimeLineSection>
        <LearningLanguageSection></LearningLanguageSection>
        </div>
    </div>
    {/* section 3 */}
    <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-center gap-8 first-letter bg-richblack-900 text-white'>
        <InstructorSection></InstructorSection>
        <h2 className='text-center text-4xl font-semibold mt-10'>Reviews from other learners</h2>
        {/* revies slider code krna hai */}
        <div className='w-[85%] mx-auto'>
            <ReviewSlider></ReviewSlider>
        </div>
    </div>
    <div className='mt-10'>
        <Footer></Footer>
    </div>
    </div>
  )
}

export default Home
