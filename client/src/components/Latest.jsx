import React, { useContext } from 'react'
import { Context } from './ContextProvider'

const Latest = () => {

    const {latestPosts} = useContext(Context);

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

        const date = new Date(dateString);
        return `${date.toLocaleDateString('en-US', options)} ${date.toLocaleTimeString('en-US', timeOptions)}`;
    }

  return (
    <div className='flex flex-col mt-10 gap-5'>
        <h1 className='font-bold text-xl text-white'>Latest Posts</h1>
        <div className='flex flex-col gap-10'>
            {
                latestPosts.map(post => (
                    <div className='flex items-center justify-between text-black bg-white rounded-xl px-10 py-2 border border-white'>
                        <div className='flex flex-col gap-4 '>
                            <p className='font-bold'>{post?.title}</p>
                            <p className='text-sm text-gray-600'>{formatDate(post?.createdAt)}</p>
                        </div>

                        <button className='bg-black w-max text-white font-bold text-sm rounded-xl px-5 py-2'>Read Post</button>

                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Latest