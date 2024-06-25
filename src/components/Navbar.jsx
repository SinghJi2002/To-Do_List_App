import React from 'react'
import logo from "./images/logo.jpg"

function Navbar() {
  return (
    <div className=' flex flex-row justify-between px-4 py-2 bg-violet-500 items-center text-white'>
      <img src={logo} alt=""  className=' w-[60px] hover:cursor-pointer hover:scale-125 transition-all duration-300'/>
      <ul className=' flex flex-row gap-x-10'>
        <li className='hover:cursor-pointer hover:scale-125 hover:text-slate-100 transition-all duration-300 font-medium'>Home</li>
        <li className=' hover:cursor-pointer hover:scale-125 hover:text-slate-100 transition-all duration-300 font-medium'>Tasks</li>
      </ul>
    </div>
  )
}

export default Navbar


