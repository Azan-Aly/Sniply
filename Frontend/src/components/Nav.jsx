import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react';


const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className='hidden sm:flex md:gap-2 lg:gap-4 items-center'>
                <Link to="/dashboard">
                    <p className='px-4 py-2 rounded-full font-bold hover:bg-[#15c08a] cursor-pointer'>Dashboard</p>
                </Link>
                <p className='px-4 py-2 rounded-full font-bold hover:bg-[#15c08a] cursor-pointer'>Analytics</p>
                <p className='px-4 py-2 rounded-full font-bold hover:bg-[#15c08a] cursor-pointer'>Settings</p>
                <button className='font-bold border px-4 py-2 rounded-md hover:bg-[#15dc96] cursor-pointer'>SignUp</button>
                <button className='font-bold border px-4 py-2 rounded-md text-white bg-[#15c08a] hover:bg-[#0a7952] cursor-pointer'>Login</button>
            </div>

            <div className='block sm:hidden'>
                <Menu width={44} height={34} onClick={() => setMenuOpen(!menuOpen)} className='cursor-pointer' />
                {menuOpen && (
                    <ul className='bg-[#ffffff] drop-shadow-2xl absolute z-50 right-0 top-1 rounded-lg shadow-lg py-4 w-[70%] h-screen flex flex-col text-center gap-6 px-4 animate-in fade-in slide-in-from-top-2 duration-300'>
                        <X width={34} height={34} onClick={() => setMenuOpen(!menuOpen)} className='cursor-pointer' />
                        <Link to="/dashboard">
                            <li className='font-bold px-4 py-2 hover:rounded-md hover:bg-[#15c08a] cursor-pointer'>Dashboard</li>
                        </Link>
                        <li className='font-bold px-4 py-2 hover:rounded-md hover:bg-[#15c08a] cursor-pointer'>Analytics</li>
                        <li className='font-bold px-4 py-2 hover:rounded-md hover:bg-[#15c08a] cursor-pointer'>Profile</li>
                        <button className='font-bold border px-4 py-2 rounded-md hover:bg-[#15dc96] cursor-pointer'>SignUp</button>
                        <button className='font-bold border px-4 py-2 rounded-md text-white bg-[#15c08a] hover:bg-[#0a7952] cursor-pointer'>Login</button>

                    </ul>
                )}
            </div>
        </>
    )
}

export default Nav