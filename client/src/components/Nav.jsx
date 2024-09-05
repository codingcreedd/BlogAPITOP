import React, { useContext, useState } from 'react'
import { Context } from './ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import logs from '../apis/logs';

const Nav = () => {

    const [search, setSearch] = useState('');

    const {setSignUp, authState, setAuthState} = useContext(Context);
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            await logs.get('/logout').then(response => {
                if(response.data.message === 'Logged out successfully'){
                    navigate(0);
                }
            })
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <nav className='flex items-start justify-between border-b text-white border-b-gray-400 py-3 text-sm px-10'>
        <h1 className='font-bold text-xl'>B-Log</h1>
        <div className='flex items-center'>
            
            <div className='ml-10 flex items-center gap-5'>
                {
                    !authState ? (
                        <div>
                            <Link to="/log" className='text-black mr-10 px-4 py-1 bg-white rounded-lg'
                            onClick={() => {setSignUp(true)}}>
                                Sign Up
                            </Link>

                            <Link to="/log" className='text-black px-4 py-1 bg-white rounded-lg'
                            onClick={() => {setSignUp(false)}}>
                                Log In
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <button onClick={logOut} className='text-black px-4 py-1 bg-gray-400 rounded-xl'>
                                Log Out
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    </nav>
  )
}

export default Nav