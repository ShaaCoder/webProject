import React, { useContext, useEffect, useState } from 'react'
import Footer from "../components/Footer"
import HomePosts from '../components/HomePosts';
import Navbar from "../components/Navbar"
import axios from 'axios'
import { URL } from '../url'
import { useLocation } from 'react-router'
import Loader from '../components/Loader'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'


const Home = () => {
  const {search} = useLocation()
  // console.log(search);
  const [noResults,setNoResults] = useState(false)
  const [posts,setPosts] = useState([])
  const [loader,setLoader] = useState(false)
  const {user} = useContext(UserContext)
  // console.log(user);
  const fetchPost=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/posts/"+search)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      setLoader(true)
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchPost()
  },[search])
  return (
    <>
      <Navbar/>
    <div className="px-8 md:px-[200px] min-[80vh]:">
    {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?posts.map((post)=>(
      <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>
      )):<h3 className='text-center font-bold mt-16' >No posts available</h3>}

    </div>
      <Footer/>
    </>
  )
}

export default Home
