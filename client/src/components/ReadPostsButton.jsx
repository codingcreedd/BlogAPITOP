import React from 'react'
import { Link } from 'react-router-dom'

const ReadPostsButton = ({postId}) => {
  return (
    <Link to={`/post/${postId}/read`} className='bg-black w-max text-white font-bold text-sm rounded-xl px-5 py-2'>Read Post</Link>
  )
}

export default ReadPostsButton