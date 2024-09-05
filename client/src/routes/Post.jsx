import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import post_api from '../apis/posts'
import { Context } from '../components/ContextProvider';
import comments_api from '../apis/comments'
import users_api from '../apis/users'

export default function Post() {
  const { post_id } = useParams();
  const [currentPost, setCurrentPost] = useState({
    title: '',
    createdAt: '',
    body: '',
    comments: []
  });

  const [comment, SetComment] = useState('');
  const [userComment, setUserComment] = useState('');

  const {authState, userId} = useContext(Context);

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  }



  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
        await comments_api.post('/create', {
            description: comment,
            userid: userId,
            postid: post_id
        }).then(response => {
            navigate(0);
        })
    } catch (err) {
        console.log(err);
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {

        const response = await post_api.get(`${post_id}/post`)
        setCurrentPost(response.data.post)

      } catch (err) {
        console.error(err)
      }
    }

    fetchPost()
  }, [])

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4 flex justify-between">
          <h1 className="text-3xl font-bold">{currentPost.title}</h1>
          <button className='text-2xl' onClick={goBack}>&lt; Back</button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-1">
        <article className="max-w-3xl mx-auto">
          <div className="mb-6 text-gray-600">
            <time className="mr-4">{new Date(currentPost.createdAt).toLocaleDateString()}</time>
            <span>By Marwan Moubayed</span>
          </div>
          <div 
            className="prose prose-lg prose-black max-w-none"
            dangerouslySetInnerHTML={{ __html: currentPost.body }} 
          />
        </article>

        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-3xl font-bold mb-6">Comments</h2>
          {authState ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => SetComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                placeholder="Add a comment..."
                required
              ></textarea>
              <button type="submit" className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                Post Comment
              </button>
            </form>
          ) : (
            <p className="mb-8 text-gray-600">Please log in to post a comment.</p>
          )}
          <div className="space-y-6">
            {currentPost.comments && currentPost.comments.map(comment => (
              <div key={comment.id} className="border-b border-gray-200 pb-4">
                <p className="mb-2">{comment.description}</p>
                <p className="text-sm text-gray-600">
                  By {comment.user.username} on {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>


      </main>
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} B-Log. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}