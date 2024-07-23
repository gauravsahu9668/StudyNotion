import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './componets/common/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import VerifyOTP from './Pages/VerifyOTP';
import { useState } from 'react';
import Forgotpassword from './Pages/Forgotpassword';
import UpdatePassword from './Pages/UpdatePassword';
import DashBoard from './Pages/DashBoard';
import About from './Pages/About';
import { useSelector } from 'react-redux';
import ContactUs from './Pages/ContactUs';
import MyProfile from './componets/core/dashboard/MyProfile';
import OpenRoute from './componets/Route/OpenRoute';
import ProtectedRoute from './componets/Route/ProtectedRoute';
import Error from './Pages/Error'
import Setting from './componets/core/dashboard/Settings.js/Setting';
import EnrollCourses from './componets/core/dashboard/EnrollCourses';
import Cart from './componets/core/dashboard/Cart/Index';
import MyCourses from './componets/core/dashboard/MyCourses/Index';
import AddCourse from './componets/core/dashboard/AddCourse';
import Category from './Pages/Category';
import CourseBuy from './Pages/CourseBuy';
import CourseView from './componets/core/courseview/CourseView';
import LectureVideo from './componets/core/courseview/LectureVideo';
function App() {
  const [accountType,setAccountType]=useState("Student");
   const {token}=useSelector((state)=>state.auth)
  const {user}=useSelector((state)=>state.profile)
  return (
    <div className='w-screen min-h-[100vh] bg-richblack-900 flex flex-col font-inter relative'>
      <div className='fixed top-0 w-full z-50 bg-richblack-900'><Navbar></Navbar></div>
      <Routes>
      <Route path='/' element={<OpenRoute><Home></Home></OpenRoute>}></Route>
        <Route path='/login' element={<OpenRoute><Login></Login></OpenRoute>}></Route>
        <Route path='/signup' element={<OpenRoute><Signup  accountType={accountType} setAccountType={setAccountType}></Signup></OpenRoute>}></Route>
        <Route path='/verifyOTP' element={<VerifyOTP></VerifyOTP>}></Route>
        <Route path='/Forgotpassword' element={<Forgotpassword></Forgotpassword>}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword></UpdatePassword>}></Route>
        <Route path='/about' element={<OpenRoute><About></About></OpenRoute>}></Route>
        <Route path='/contact' element={<OpenRoute><ContactUs></ContactUs></OpenRoute>}></Route>
        <Route path='/catelog/:id' element={<Category></Category>}></Route>
        {/* dahsboard ko hi protected route me dal dya agr ye token null hoga to ye open
         nhi hoga or eske andr kuch bhi open nhi hoga */}
        <Route  element={<ProtectedRoute><DashBoard></DashBoard></ProtectedRoute>}>
             <Route path='/dashboard/my-profile' element={<MyProfile></MyProfile>}></Route>
             <Route path='/dashboard/settings' element={<Setting></Setting>}></Route>
             {
              user?.accountType==="Student" && (
                <>
                <Route path='/dashboard/enrolled-courses' element={<EnrollCourses></EnrollCourses>}></Route>
                <Route path='/dashboard/cart' element={<Cart></Cart>}></Route>
                </>
              )
             }
             {
              user?.accountType==="Instructor" && (
                <>
                   <Route path='/dashboard/my-courses' element={<MyCourses></MyCourses>}></Route>
                   <Route path='/dashboard/add-course' element={<AddCourse></AddCourse>}></Route>
                </>
              )
             }
        </Route>
        <Route path='/course-buy/:id' element={<CourseBuy></CourseBuy>}></Route>
        {
          token!==null && user?.accountType==="Student" && (
            <Route path='/courseview/:id' element={<CourseView></CourseView>}>
            </Route>
          )
        }
        <Route path='*' element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}

export default App;
