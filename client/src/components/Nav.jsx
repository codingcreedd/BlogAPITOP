import React, { useState } from 'react'

const Nav = () => {

    const [search, setSearch] = useState('');

  return (
    <nav className='flex items-start justify-between border-b text-white border-b-gray-400 py-3 text-sm px-10'>
        <h1 className='font-bold text-xl'>B-Log</h1>
        <div className='flex items-center'>
            
            <div className='ml-10 flex items-center gap-5'>
                <button className='text-black px-4 py-1 bg-gray-400 rounded-xl'>
                    Sign Up
                </button>

                <button className='text-black px-4 py-1 bg-gray-400 rounded-xl'>
                    Log In
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Nav