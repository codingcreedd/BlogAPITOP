import React, { useContext, useEffect } from 'react'
import { Context } from './ContextProvider'

const MainPost = () => {

    const {authState, setAuthState, mainPost} = useContext(Context);

  return (
    <div className='rounded-xl bg-whitea w-full px-10 py-5 flex flex-col bg-white'>
        <div className='text-sm'>This article has been written by the admin</div>
        <div className='h-[30px]'></div>
        <div className='mt-auto flex flex-col gap-10'>
                <h1 className='text-3xl font-bold text-black'>{mainPost?.title}</h1>
                <div className='text-sm'>This is a dummy text to test how it looks</div>
                <button className='bg-main-dark w-max text-white font-bold text-sm rounded-xl px-5 py-2'>Read Article</button>
        </div>
    </div>
  )
}

export default MainPost