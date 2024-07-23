import React, { useEffect, useState } from 'react'
import { setCourse, setStep } from '../../../../slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { apiconnector } from '../../../../services/apiconnector'
import { categories } from '../../../../services/apis'
import RequirementField from './RequirementField'
import CourseTagFeild from './CourseTagFeild'
import UploadThumbNail from './UploadThumbNail'
import {addcourseDetails} from '../../../../services/operation/courses'
import toast from 'react-hot-toast'
import { MdNavigateNext } from "react-icons/md";
const CourseInformation = () => {
    const {
      register,
      watch,
      handleSubmit,
      setValue,getValues,formState:{errors}
    }=useForm()
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const {course,editCourse,step}=useSelector((state)=>state.course)

    const [courseCategories,setcourseCategories]=useState([])
    const getcategories=async()=>{
      // setloading(true)
      const {CATEGORIES_API}=categories
      const response=await apiconnector("GET",CATEGORIES_API)
      console.log(response.data.data)
      if(response.data.data.length>0){
        setcourseCategories(response.data.data)
      }
      console.log(courseCategories)
      // setloading(false)
    }
    const onsubmit=async(data)=>{
          // if(editCourse){
          //   const currentvalues=getValues()
          //   const formData=new FormData()
            
          //   formData.append("courseId",course._id)
          //   if(currentvalues.courseTitle!==course.courseName){
          //     formData.append("courseName",data.courseTitle)
          //   } 
          //   if(currentvalues.courseShortDesc!==course.courseDescription){
          //     formData.append("courseDescription",data.courseShortDesc)
          //   } 
          //   if(currentvalues.coursePrice!==course.Price){
          //     formData.append("price",data.coursePrice)
          //   } 
          //   if(currentvalues.courseBenefits!==course.whatyouwilllearn){
          //     formData.append("whatyouwilllearn",data.courseBenefits)
          //   } 
          //   if(currentvalues.courseCategory!==course.category){
          //     formData.append("category",data.courseCategory)
          //   } 
          //   if(currentvalues.courseRequirementFeild.toString()!==course.instructions.toString()){
          //     formData.append("instructions",JSON.stringify(data.courseRequirementFeild))
          //   } 

          //   setloading(true)
          //   const result =await
          // }
          const {courseTitle,courseShortDesc,courseBenefits,coursePrice,courseThumbnail,courseCategory,
            courseTags,courseRequirementFeild
          }=data
          const formdata=new FormData()

          formdata.append("courseName",courseTitle)
          formdata.append("courseDescription",courseShortDesc)
          formdata.append("whatyouwilllearn:",courseBenefits)
          formdata.append("price",coursePrice)
          formdata.append("thumbnailimage",courseThumbnail[0])
          formdata.append("category",courseCategory)
          formdata.append("tag",courseTags)
          formdata.append("instructions",courseRequirementFeild)
          const toastId=toast.loading("loding")
          addcourseDetails(formdata,token).then((result)=>{

            if(result.data.success){
              dispatch(setStep(2))
            dispatch((setCourse(result.data.data)))
            toast.dismiss(toastId)
            toast.success("Course details added successfully")
            }
          })
          // if(result){
          //   dispatch(setStep(2))
          //   dispatch((setCourse(result)))
          // }
          
    } 
    useEffect(()=>{

      if(editCourse){
        setValue("courseTitle",course.courseName)
        setValue("courseShortDesc",course.courseDescription)
        setValue("coursePrice",course.price)
        setValue("courseTags",course.tag)
        setValue("courseBenefits",course.whatyouwilllearn)
        setValue("courseCategory",course.category)
        setValue("courseRequirementFeild",course.instructions)
        setValue("courseThumbnail",course.thumbnail)

      }
      getcategories()
    },[])
  return (
    <div>
        <form onSubmit={handleSubmit(onsubmit)} className='rounded-md border-[1px] border-richblack-700 bg-richblack-800
        p-6 space-y-8'>
            <div className='flex flex-col gap-2 text-[18px] font-bold'>
              <label htmlFor='' className='text-richblack-50'>Course Title<sup>*</sup></label>
              <input
              id='CourseTitle'
              placeholder='Enter course Title'
              {...register("courseTitle",{required:true})}
              className='outline-none w-full p-3 rounded-lg text-[16px] text-richblack-500 bg-richblack-900 border-b-[3px] border-richblack-700'></input>
              {
                errors.courseTitle && (
                  <span>Course Title is required</span>
                )
              }
            </div>
            <div  className='flex flex-col gap-2 text-[18px] font-bold'>
              <label htmlFor='courseShortDesc'  className='text-richblack-50'>Course Short Description<sup>*</sup></label>
              <textarea
              id='courseShortDesc'
              type='textarea'
              rows={'6'}
              placeholder='Enter Description'
              {...register("courseShortDesc",{required:true})}
              className='outline-none w-full p-3 rounded-lg text-[16px] text-richblack-500 bg-richblack-900 border-b-[3px] border-richblack-700'></textarea>
              {
                errors.courseShortDesc && (
                  <span>Course Description required</span>
                )
              }
            </div>
            <div  className='flex flex-col gap-2 text-[18px] font-bold'>
              <label htmlFor='coursePrice'  className='text-richblack-50'>Course Price<sup>*</sup></label>
              <input
              id='coursePrice'
              placeholder='Enter Course price'
              {...register("coursePrice",{required:true,valueAsNumber:true})}
              className='outline-none w-full p-3 rounded-lg text-[16px] text-richblack-500 bg-richblack-900 border-b-[3px] border-richblack-700'></input>
              {
                errors.coursePrice && (
                  <span>Course Price required</span>
                )
              }
            </div>
            <div  className='flex flex-col gap-2 text-[18px] font-bold'>
              <label className='text-richblack-50' htmlFor='courseCategory'>Course Category<sup>*</sup></label>
              <select className=' outline-none w-full p-3 rounded-lg text-[16px] text-richblack-500 bg-richblack-900 border-b-[3px] border-richblack-700' id='courseCategory' defaultValue='' {...register("courseCategory",{required:true})}>
                  <option value='' disabled>Choose Your category</option>
                  {
                    courseCategories.map((item ,index)=>{
                      return (
                        <option key={index} value={item?._id}>
                          {item?.name}
                        </option>
                      )
                    })
                  }
              </select>
            </div>
            {/* custom component create krna pdega tags me */}
            <CourseTagFeild
            name='courseTags'
            label='Course Tags'
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}>
            </CourseTagFeild>
            {/* yha file  upload krna chah rha */}
            <UploadThumbNail
            name='courseThumbnail'
            label='Course Thumbnail'
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            watch={watch}>

            </UploadThumbNail>
            <div  className='flex flex-col gap-2 text-[18px] font-bold'>
              <label htmlFor='coursebenefits'  className='text-richblack-50'>Benefits of the course<sup>*</sup></label>
              <textarea
              id='coursebenefits'
              type='textarea'
              rows={'4'}
              placeholder='Enter benefits'
              {...register("courseBenefits",{required:true})}
              className='outline-none w-full p-3 rounded-lg text-[16px] text-richblack-500 bg-richblack-900 border-b-[3px] border-richblack-700'></textarea>
              {
                errors.courseBenefits && (
                  <span>Course Benefits required</span>
                )
              }
            </div>
            <RequirementField
              name='courseRequirementFeild'
              label="Requirement/Instruction"
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}>
            </RequirementField>
            <div>
                {
                  editCourse && (
                    <button  onClick={()=>{dispatch(setStep(2))}}>
                      Continue without saving
                    </button>
                  )
                }
                {
                  !editCourse ?  (
                   <div className='flex justify-end'>
                    <button type='submit' className='flex items-center rounded-lg px-4 py-2 bg-yellow-100 text-[20px] font-bold'>
                      <span>
                      Next
                      </span>
                      <MdNavigateNext ></MdNavigateNext>
                    </button>
                   </div>
                  ):(
                    <button>Save Changes</button>
                  )
                }
            </div>
        </form>
    </div>
  )
}

export default CourseInformation
