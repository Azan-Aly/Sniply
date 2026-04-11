import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    
        <div className='flex gap-4 items-center'>
            <Link to="/dashboard">
                <p className='px-4 py-2 rounded-full font-bold hover:bg-[#15c08a] cursor-pointer'>Dashboard</p>
            </Link>
            <p className='px-4 py-2 rounded-full font-bold hover:bg-[#15c08a] cursor-pointer'>Analytics</p>
            <p className='px-4 py-2 rounded-full font-bold hover:bg-[#15c08a] cursor-pointer'>Settings</p>
        </div>
    
  )
}

export default Nav