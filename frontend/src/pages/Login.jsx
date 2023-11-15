import { useState } from "react";
import Footer from "../components/Footer";
import { Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios";
import {URL} from '../url'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const {setUser}= useContext(UserContext)
  const [error,setError]= useState(false)
  const navigate=useNavigate()
  const handleLogin = async () =>{
    try{
      const res = await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
      // console.log(res.data);
      setUser(res.data) //it set data to user
      navigate("/")
    }
    catch(err){
      setError(true)
      console.log(err);
    }
  }

  return (
    <>
    <div className="flex item-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-xl md:text-xl font-extrabold ">
      <h3>
          <Link to="/register">register</Link>
        </h3>
      </h1>
      </div>
    <div className='w-full flex justify-center items-center h-[70vh] '>
      <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>
        <h1 className='text-xl font-bold text-left'>Login To Your Account </h1>
        <input onChange={(e)=>setEmail(e.target.value)} className='w-full px-4 py-2 border-2 border-black outline-0' type="text" placeholder='Enter Your email' />
        <input onChange={(e)=>setPassword(e.target.value)} className='w-full px-4 py-2 border border-black outline-0' type="password"  placeholder='Enter Your password' />
        <button onClick={handleLogin} className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-green-500 hover:text-black'>Login</button>
        {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}

        <div className='flex justify-center items-center space-x-3 '>
          <p>New Here?</p>
          <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Login
