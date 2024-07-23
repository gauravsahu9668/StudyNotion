import React from 'react'
import HighlighText from '../componets/core/homepage/HighlighText'
import image1 from '../Assets/Images/aboutus1.webp'
import image2 from '../Assets/Images/aboutus2.webp'
import image3 from '../Assets/Images/aboutus3.webp'
import Quote from '../componets/core/aboutpage/Quote'
import foundingstroy from '../Assets/Images/FoundingStory.png'
import StatsComponent from '../componets/core/aboutpage/StatsComponent'
import LearningGrid from '../componets/core/aboutpage/LearningGrid'
import ContactFormSection from '../componets/core/aboutpage/ContactFormSection'
import Footer from '../componets/common/Footer/Footer'
const About = () => {
  return (
    <div className='w-full'>
      {/* section 1 */}
      <div className='bg-richblack-800 h-[500px]'>
      <div className='w-[80%] flex flex-col items-center gap-3 pt-5 mx-auto relative '>
               <div className='text-center w-[62%] text-[32px] text-white font-bold mt-14'>
               Driving Innovation in Online Education for a
               </div>
               <div className='text-center w-[62%] text-[32px] text-blue-100 font-bold'>Bright future</div>
               <div className='w-[65%] text-center text-richblack-500 font-bold'>
                  StudyNotion is at the forfront of driving innovation in online education, We're passinate
                  about creating a brighter future by offring cutting-edge courses, leveraging
                  emerging technologies, and nurturing a vibrant learning community
               </div>
               <div className='flex gap-5 mt-5'>
                <img src={image1} className='rounded-md w-fit'></img>
                <img src={image2} className='rounded-md w-fit'></img>
                <img src={image3} className='rounded-md w-fit'></img>
               </div>
        </div>
      </div>
      {/* section 2 */}
      <section>
         <div className='text-center w-[80%] mx-auto mt-52'>
            <Quote></Quote>
         </div>
      
      </section>
      {/* section 3 */}
      <section>
        <div className='text-white mt-20'>
            {/* left bala */}
            <div className='flex w-[80%] mx-auto gap-10 py-9 justify-between'>
                <div className='flex w-[50%] flex-col gap-3 text-richblack-500 text-[16px]'>
                    <h1 className='text-[30px] font-bold text-pink-200'>Our Founding Story</h1>
                    <p>In the bustling heart of Silicon Valley, three college friends, each with
                         a unique background in education, technology, and business, found themselves
                        united by a shared frustration: the traditional education system. Emma, a passionate
                         high school teacher, constantly saw her students struggling to keep up with a one-size-fits-all
                         curriculum.  </p>
                    <p>
                    Today, StudyNotion serves millions of students across the globe, empowering them to learn
                     at their own pace, in their own way. What started as a dream over coffee has grown into
                      a thriving company, driven by the same passion and dedication to transforming education
                       that brought Emma, Raj, and Sarah.
                    </p>
                </div>
                <div className='w-[50%] flex items-center justify-center'>
                    <img src={foundingstroy}></img>
                </div>
            </div>
            {/* *second bloack*/}
            <div className='flex flex-row  w-[80%] mx-auto gap-10 py-16 justify-between'>
                <div className='flex flex-col gap-2 w-[50%]'>
                    <h1 className='text-[30px] text-brown-50'> Our vision</h1>
                     <p className='text-richblack-500 text-lg '>Our vision at StudyNotion is to create a world where education is universally accessible,
                         personalized, and empowering. We believe in the transformative power of technology to
                        bridge gaps in traditional education systems, making learning an engaging and individualized
                        experience. Our goal is to ensure that every learner, regardless of their background or geographical
                        location, has access to top-tier educational resources and the ability to learn at their own pace.</p>
                     
                </div>
                <div  className='flex flex-col gap-2 w-[50%]'>
                    <h1 className='text-[30px] text-blue-300'>Our Mission</h1>
                    <p className='text-richblack-500 text-lg '>Our mission at StudyNotion is to revolutionize education by harnessing the power of technology
                     to deliver personalized, accessible, and high-quality learning experiences. We are committed 
                     to breaking down barriers to education and providing students with the tools they need to succeed
                      in a rapidly evolving world. Through innovative digital solutions, engaging content, and a
                     supportive community, we aim to inspire and empower learners to reach their full potential.</p>
                </div>
            </div>

        </div>
      </section>
      {/* section 4 */}
      <section className='bg-richblack-800 mt-16'>
        <StatsComponent></StatsComponent>
      </section>
      {/* section 5 */}
      <section className='flex flex-col gap-5 justify-between'>
        <LearningGrid></LearningGrid>
        <ContactFormSection></ContactFormSection>
      </section>
      <Footer></Footer>
    </div>
  )
}

export default About
