import React from 'react'
import { IF } from '../url'


const ProfilePost = ({p}) => {
  return (
    <div className="w-full flex mt-8 space-x-4">
    {/* left side */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IF+p.photo} className="w-full h-full object-cover" alt="" />
      </div>
      {/* right Side */}
      <div className="flex flex-col w-[65%]">
      <h1 className="text-xl font-bold md:mb2 mb-1 md:text-2xl">
        {p.title}
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-grey-500 item-center justify-between md:mb-4">
        <p>@{p.username}</p>
        <div className="flex space-x-2">
        <p>{new Date(p.updatedAt).toString().slice(0,15)}</p>
          <p>{new Date(p.updatedAt).toString().slice(16,24)}</p>
        </div>
      </div>
      <p className="text-sm md:text">{p.desc}</p>


      </div>
    </div>
  )
}

export default ProfilePost
