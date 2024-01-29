import React from 'react';
import { IF } from '../url';

const HomePosts = ({ post }) => {
  const formattedDate = post.updatedAt
    ? new Date(post.updatedAt).toString().slice(0, 15)
    : '';
  const formattedTime = post.updatedAt
    ? new Date(post.updatedAt).toString().slice(16, 24)
    : '';

  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* Left side */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF + post.photo}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      {/* Right side */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>{post.username}</p>
          <div className="flex space-x-2">
            {formattedDate && <p>{formattedDate}</p>}
            {formattedTime && <p>{formattedTime}</p>}
          </div>
        </div>
        <p className="text-sm md:text">{post.desc}</p>
        {/* For sliced post description, use {post.desc.slice(0, 200) + '...Read more'} */}
      </div>
    </div>
  );
};

export default HomePost;
