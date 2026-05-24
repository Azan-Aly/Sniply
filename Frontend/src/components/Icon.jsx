import React from 'react'
import { Link } from 'react-router-dom'

const Icon = () => {
    return (
        <Link to="/" className="group block">
            <div className='flex items-center gap-2.5 cursor-pointer'>
                {/* Logo Icon with double gradient rings & hover rotation */}
                <div className='relative bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center rounded-xl h-9 w-9 shadow-md shadow-emerald-200/50 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300'>
                    <div className="absolute inset-0.5 rounded-lg bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="relative z-10">
                        <path d="M6 8a3 3 0 0 1 4.24 0l1.5-1.5a3 3 0 0 0-4.24-4.24L6 3.76" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 8a3 3 0 0 1-4.24 0l-1.5 1.5a3 3 0 0 0 4.24 4.24L10 12.24" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Wordmark with Outfit font-display */}
                <div className="flex items-center">
                    <span className='font-display font-extrabold text-xl tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors duration-200'>
                        snip<span className='bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent'>.ly</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default Icon