import { useContext, useState } from 'react'
import { Context } from './components/ContextProvider'
import Nav from './components/Nav'
import Blogs from './components/Blogs'
import Footer from './components/Footer'

function App() {

  return (
    <div className='bg-main-dark flex flex-col h-screen w-full'>
        <Nav />
        <Blogs />
        <Footer />
    </div>
  )
}

export default App
