import React, { useContext, useEffect, useState } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { GoEye, GoEyeClosed } from 'react-icons/go'
import { IoMdHome } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { googleloginAPI, loginAPI, registerAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'

import { GoogleLogin } from '@react-oauth/google';

import { jwtDecode } from "jwt-decode";
import Profile from '../../users/pages/Profile'
import { userAuthContext } from '../../context/AuthContext'

function Auth({ register }) {

  const [show, setShow] = useState(false)    //created for password field eye button opening and closing

  // register state

  const [userdetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  const {setAuthorisedUser}=useContext(userAuthContext)
  console.log(userdetails);
  const navigate=useNavigate()





  //register function
  const HandleRegister = async () => {
    const { username, email, password } = userdetails  //destructring state objects with in {} braces 
    if (!username || !email || !password) {
      toast.info("Fill the form Completely")
    } else {
      const result = await registerAPI(userdetails)//requestbody userdetails
      console.log(result);
      if (result.status == 200) {
        toast.success(`Registerd Successfully`)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate("/login")
      } else if (result.status == 404) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.error(`Something Went Wrong`)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }
  }


  //login

  const HandleLogin = async () => {
    const { email, password } = userdetails
    if (!email || !password) {
      toast.info("Fill the form Completely")
    } else {
      const result = await loginAPI(userdetails)
      console.log(result);
      if (result.status == 200) {
       
        //  Store existinguser & token in sessionStorage
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
         toast.success(`Login Successfully`)
        setAuthorisedUser(true)
         if(result.data.existingUser.role=="admin"){
          navigate("/admin-home")

        }else{
          navigate("/")
        }
        setUserDetails({

          email: "",
          password: ""
        })
        // navigate("/")
        setTimeout(() => navigate("/"), 10)
      } else if (result.status == 401) {
        toast.warning(result.response.data)
        setUserDetails({
          email: "",
          password: ""
        })
      } else if (result.status == 404) {
        toast.warning(result.response.data)

        setUserDetails({

          email: "",
          password: ""
        })
      }
      else {
        toast.warning(`Something Went Wrong`)
        setUserDetails({

          email: "",
          password: ""
        })
      }

    }
  }


  //google login
  const handleGoogleLogin=async(credentialResponse)=>{
    console.log(credentialResponse.credential);
    const googleData=jwtDecode(credentialResponse.credential)
    console.log(googleData);
    try {
      const result=await googleloginAPI({password:"googlepassword",username:googleData.name,email:googleData.email,Profile:googleData.picture})
      console.log(result);
      if(result.status==200){
         sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
        toast.success("login success")
       setAuthorisedUser(true)
        if(result.data.existingUser.role=="admin"){
          navigate("/admin-home")

        }else{
          navigate("/")
        }

      }else{
        toast.error(`something wentwrong`)
      }
      
      
    } catch (error) {
      console.log(error);
      
      
    }

    
    
  }







  return (
    <>
      <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[url(https://img.freepik.com/free-photo/arrangement-with-books-beautiful-flowers_23-2148882784.jpg)] bg-cover bg-center'>
        <div className='p-10'>
          <h1 className='text-3xl  font-bold text-center text-white'>BOOKSTORE</h1>
          <div style={{ width: "400px" }} className='bg-blue-950 text-white p-5 flex flex-col my-5 justify-center items-center'>
            <Link to={'/'}> <IoMdHome className='me-80 text-2xl' /></Link>
            <div style={{ width: "100px", height: '100px', borderRadius: "50%" }} className='border mb-3 flex justify-center items-center'>
              <FaCircleUser className='text-6xl' />
            </div>
            <h1 className='text-2xl'>{register ? "Register" : "Login"}</h1>

            <form action="">

              {register && <div className='my-5'>
                <label htmlFor="">Username</label>
                <input value={userdetails?.username} onChange={(e) => setUserDetails({ ...userdetails, username: e.target.value })} type="text" placeholder='username ' className='bg-white p-2 w-full  rounded mt-2 placeholder-gray-500 text-black' />

              </div>}


              <div className='mt-5'>
                <label htmlFor="">Email</label>
                <input value={userdetails?.email} onChange={(e) => setUserDetails({ ...userdetails, email: e.target.value })} type="text" placeholder='Email ' className='bg-white p-2 w-full  rounded mt-2 placeholder-gray-500 text-black' />

              </div>
              <div className='mt-5'>
                <label htmlFor="">Password</label>
                <div className='flex items-center'>
                  {/* when click the eye it shows the password otherwisw it shows the dots */}
                  <input value={userdetails?.password} onChange={(e) => setUserDetails({ ...userdetails, password: e.target.value })} type={show ? 'text' : 'password'} placeholder='password ' className='bg-white p-2 w-full  rounded mt-2 placeholder-gray-500 text-black' />
                  {show ? <GoEye onClick={() => setShow(!show)} className='text-gray-500 cursor-pointer mt-2' style={{ marginLeft: '-30px' }} /> :
                    <GoEyeClosed onClick={() => setShow(!show)} className='text-gray-500 cursor-pointer mt-2' style={{ marginLeft: '-30px' }} />}
                </div>
              </div>
              <div className='mt-2'>
                <p className='text-xs text-orange-400'>*Never share your password with others</p>
              </div>
              <div className='mt-4'>
                {register ? <button onClick={HandleRegister} type='button' className='bg-green-700 p-2 w-full rounded'>Register</button> :
                  <button onClick={HandleLogin} type='button' className='bg-green-700 p-2 w-full rounded'>Login</button>}
              </div>
              {/* google authentication */}
              <div>

              {!register && <div className='mt-3'>
               <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLogin(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  
                />
                </div>}
                {register ? <p>Are you Already a user<Link to={"/login"} className='text-blue-400'>Login</Link></p> :
                  <p>Are you a new user<Link to={"/register"} className='text-blue-400'>Register</Link></p>}
              </div>
            </form>
          </div>

        </div>
      </div>

    </>
  )
}

export default Auth