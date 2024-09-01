import React from 'react'

const Footer = () => {
  return (
    <div className='bg-main-dark py-10 flex mt-auto flex-col px-40 text-gray-400 justify-center'>
        <div className='flex justify-between font-bold'>
            <p>About</p>
            <p>Write</p>
            <p>Advertise</p>
            <p>Publish</p>
            <p>Projects</p>
        </div>

        <div className='flex items-center gap-10 mt-5 justify-center'>
            <i className='bx bxl-instagram text-xl'></i>
            <i className='bx bxl-facebook text-xl'></i>
            <i className='bx bxl-youtube text-xl'></i>
            <i className='bx bxl-linkedin-square text-xl'></i>
            <i className='bx bxl-github text-xl'></i>
        </div>

        <div className='font-bold text-sm mt-10 text-center'>
            &copy; 2024 codingcreed BlogAPI
        </div>
    </div>
  )
}

export default Footer