import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from './ContextProvider';
import log_api from '../apis/logs'
import logs from '../apis/logs';

export default function SignUpForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {setSignUp} = useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try { 
        await logs.post('/signup', {
          uname: username,
          pw: password
        }).then(response => {
            setSignUp(false);
        })
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-main-dark text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1c1c1c] rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-200">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-black bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <span onClick={() => {setSignUp(false)}} className="text-white hover:underline">
            Click here to sign in
          </span>
        </p>
      </div>
    </div>
  )
}