import React, { useContext, useEffect, useLayoutEffect } from 'react'
import MainPost from './MainPost'
import Search from './Search'
import Feaured from './Feaured'
import { Context } from './ContextProvider';
import post_api from '../apis/posts'
import Latest from './Latest';

const Blogs = () => {

  const {setMainPost, setFeaturedPosts, setLatestPosts} = useContext(Context);

  useLayoutEffect(() => {
    const fetchMainPost = async () => {
        const mainPost = await post_api.get('/main');
        setMainPost(mainPost.data.mainPost);

        const featuredPosts = await post_api.get('/featured');
        setFeaturedPosts(featuredPosts.data.posts)
        
        const latestPost = await post_api.get('/latest');
        setLatestPosts(latestPost.data.posts)
    }

    fetchMainPost();
}, [])

  return (
    <div className='px-48 mt-10 flex flex-col gap-10 bg-main-dark'>
        {/*Main Post*/}
        <div className='flex gap gap-20'>
            <div className='w-[55%]'>
              <MainPost />
            </div>
            <div className='w-[45%]'>
              <Search />
            </div>
            
        </div>
        <div className='flex flex-col'>
            <Feaured />
            <Latest />
        </div>
    </div>
  )
}

export default Blogs