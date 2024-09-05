import React, { useContext, useLayoutEffect } from 'react';
import MainPost from './MainPost';
import Search from './Search';
import Featured from './Feaured';
import { Context } from './ContextProvider';
import post_api from '../apis/posts';
import Latest from './Latest';

const Blogs = () => {
  const { setMainPost, setFeaturedPosts, setLatestPosts } = useContext(Context);

  useLayoutEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch all data concurrently
        const [mainPostRes, featuredPostsRes, latestPostRes] = await Promise.all([
          post_api.get('/main'),
          post_api.get('/featured'),
          post_api.get('/latest'),
        ]);

        setMainPost(mainPostRes.data.mainPost);
        setFeaturedPosts(featuredPostsRes.data.posts);
        setLatestPosts(latestPostRes.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [setMainPost, setFeaturedPosts, setLatestPosts]);

  return (
    <div className="px-48 mt-10 flex flex-col gap-10 bg-main-dark">
      {/* Main Post */}
      <div className="flex gap-20">
        <div className="w-[55%]">
          <MainPost />
        </div>
        <div className="w-[45%]">
          <Search />
        </div>
      </div>
      <div className="flex flex-col">
        <Featured />
        <Latest />
      </div>
    </div>
  );
};

export default Blogs;
