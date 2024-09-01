import React, { useContext } from 'react'
import { Context } from './ContextProvider'

const Feaured = () => {

    const {featuredPosts} = useContext(Context);

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

        const date = new Date(dateString);
        return `${date.toLocaleDateString('en-US', options)} ${date.toLocaleTimeString('en-US', timeOptions)}`;
    }

    return (
        <div className='flex flex-col gap-10 mt-10 text-white'>
            <h1 className='font-bold text-2xl'>Featured Articles</h1>
            {
                featuredPosts && (
                    <div className='grid grid-cols-3 gap-5 w-full text-black'>
                        {
                            featuredPosts.map(post => (
                                <div key={post.id} className='rounded-lg bg-white flex flex-col px-10 pt-4 pb-4'>
                                    <h1 className='text-xl'>Article</h1>
                                    <p className='text-lg font-bold'>{post?.title}</p>
                                    <p className='text-sm mt-2 mb-5 overflow-hidden whitespace-nowrap text-ellipsis'>
                                        {post?.body}
                                    </p>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='font-bold text-lg'>Marwan Moubayed</p>
                                            <p>{formatDate(post.createdAt)}</p>
                                        </div>
                                        <div>
                                            {/* Add any other content you need here */}
                                        </div>
                                    </div>
                                </div> 
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Feaured
