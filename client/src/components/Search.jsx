import React, { useState } from 'react'
import post_api from '../apis/posts';
import { Link } from 'react-router-dom';

const Search = () => {

    const [searchInput, setSearchInput] = useState('');
    const [searching, setSearching] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [searchPosts, setSearchPosts] = useState([]);
    

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        
        if(query === '') {
            setSearchInput('');
            setSearchResult(false);
            setSearching(false);
            return;
        }

        setSearchInput(e.target.value)
        setSearchResult(true);
        setSearching(true);

        //fetch at every input change
        await post_api.post('/search-post', {
            search: query
        }).then(posts => {
            setSearching(false);
            setSearchPosts(posts.data.posts);
        })

    }

  return (
    <div className='flex flex-col rounded-xl px-10 py-3 bg-white'>
        <div className='flex items-center gap-5'>
            <i className='bx bx-search-alt-2 text-black'></i>
            <input type="text" placeholder='Search a Post' value={searchInput}
            onChange={(e) => {handleSearchChange(e)}} className='outline-none text-black' />
        </div>
        {
            searchResult && (
                <div className='flex flex-col rounded-bl-xl rounded-br-xl bg-white max-h-[210px] overflow-y-auto'>
                    <div>
                        {
                            searching && <p className='text-gray-600 py-2 font-bold text-sm'>Searching...</p>
                        }
                    </div>

                    {
                        (searchPosts && searchPosts.length > 0) ? (
                            <div className='flex flex-col mt-5'>
                                {
                                    searchPosts.map(post => (
                                        <Link to={`/post/${post.id}/read`} key={post.id} className='text-black py-2 text-sm cursor-pointer hover:bg-gray-200'>{post.title}</Link>
                                    ))
                                }
                            </div>
                        ) : (
                            <p className='text-black text-sm mt-5'>No posts found</p>
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

export default Search