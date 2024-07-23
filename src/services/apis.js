
const BASE_URL=process.env.REACT_APP_BASE_URL
const SEARVER_BASE_URL='https://study-notion-api-mu.vercel.app'
export const categories ={
    CATEGORIES_API: SEARVER_BASE_URL + "/course/showallCategory",
    SENTOTP_API:SEARVER_BASE_URL+"/auth/sendotp",
    RESETPASSWORDTOKEN_API:SEARVER_BASE_URL+"/auth/resetPasswordToken",
    RESETPASSWORD_API:SEARVER_BASE_URL+"/auth/resetPassword",
    SIGNUP_API:SEARVER_BASE_URL+"/auth/signup",
    LOGIN_API:SEARVER_BASE_URL+"/auth/login",
    UPDATE_PROFILE_API:SEARVER_BASE_URL+"/profile/updateprofile",
    UPDATE_PASSWORD_API:SEARVER_BASE_URL+"/profile/updatepassword",
    UPDATE_PROFILE_PICTURE_API:SEARVER_BASE_URL+"/profile/updateprofilepic",
    GET_ENROLL_COURSES_API:SEARVER_BASE_URL+"/profile/getenrollcourses",
    GET_INSTRUCTOR_ALL_COURSES_API:SEARVER_BASE_URL+"/course/getallinstructorcourses",
    CREATE_COURSE_API:SEARVER_BASE_URL+"/course/createCourse",
    UPDATE_SECTION_API:SEARVER_BASE_URL+"/course/updateSection",
    CREATE_SECTION_API:SEARVER_BASE_URL+"/course/createSection",
    DELETE_SECTION_API:SEARVER_BASE_URL+"/course/deleteSection",
    CREATE_SUBSECTION_API:SEARVER_BASE_URL+"/course/createSubsection",
    DELETE_SUBSECTION_API:SEARVER_BASE_URL+"/course/deleteSubsection",
    PUBLISH_COURSE_API:SEARVER_BASE_URL+"/course/publishCourse",
    DELETE_COURSE_API:SEARVER_BASE_URL+"/course/deleteCourse",
    CATEGORY_COURSE_API:SEARVER_BASE_URL+"/course/cetegoryPageDetails",
    GETFULL_COURSE_DETAILS:SEARVER_BASE_URL+"/course/getfullcoursedetils",
    ADD_TO_CART_API:SEARVER_BASE_URL+"/course/addtocart",
    CART_DETAILS_API:SEARVER_BASE_URL+"/course/cartdetails",
    REMOVE_FROM_CART_API:SEARVER_BASE_URL+"/course/removefromcart",
    BUY_COURSE_API:SEARVER_BASE_URL+"/course/buycourse",
    RATING_REVIEW_API:SEARVER_BASE_URL+"/course/createRating",
    GET_ALL_REVIEWS_API:SEARVER_BASE_URL+"/course/getReviews"
};
