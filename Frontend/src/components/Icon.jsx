import React from 'react'
import { Link } from 'react-router-dom'

const Icon = () => {
    return (
        <Link to="/">
            <div className='flex gap-2 cursor-pointer'>
                {/* // Icon only */}
                <div className='bg-[#1D9E75] flex items-center justify-center rounded-lg h-10 w-10 md:h-8 md:w-8'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 8a4 4 0 0 0 5.66 0l1.42-1.42a4 4 0 0 0-5.66-5.66L6.7 2.24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 8a4 4 0 0 0-5.66 0L2.92 9.42a4 4 0 0 0 5.66 5.66l1.72-1.72" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* // With wordmark */}
                <div className="flex items-center gap-2">
                    <span className='font-bold text-xl md:text-lg'>
                        snip<span className='text-[#1D9E75]'>.ly</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default Icon