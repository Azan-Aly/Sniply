import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, LayoutDashboard, BarChart3, User } from 'lucide-react';
import { useAuth } from "../context/AuthContext";

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { user } = useAuth()

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) => `
        flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer
        ${isActive(path) 
            ? 'bg-emerald-50 text-emerald-700 font-bold shadow-xs' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'}
    `;

    return (
        <>
            {/* Desktop Navigation */}
            <div className='hidden sm:flex sm:gap-2 md:gap-3 lg:gap-4 items-center'>
                {user ? (
                    <>
                        <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                            <LayoutDashboard size={16} />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/analytics" className={navLinkClass('/analytics')}>
                            <BarChart3 size={16} />
                            <span>Analytics</span>
                        </Link>
                        <Link to="/profile" className={navLinkClass('/profile')}>
                            <User size={16} />
                            <span>Profile</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <span className='text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 hover:bg-slate-100/50 rounded-full transition-all duration-200 cursor-pointer'>
                                Login
                            </span>
                        </Link>
                        <Link to="/register">
                            <button className='flex items-center gap-1 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-5 py-2 rounded-full shadow-md shadow-emerald-100 hover:shadow-lg transition-all duration-250 cursor-pointer hover:scale-[1.02] active:scale-[0.98]'>
                                Sign Up
                                <ArrowRight size={14} />
                            </button>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className='block sm:hidden relative z-50'>
                <button 
                    onClick={() => setMenuOpen(!menuOpen)} 
                    className='p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200 cursor-pointer'
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                
                {/* Mobile Menu Panel */}
                {menuOpen && (
                    <div className='fixed inset-x-4 top-18 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl p-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-300 z-50'>
                        <div className="flex flex-col gap-2">
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-bold transition-all duration-200">
                                        <LayoutDashboard size={20} className="text-slate-400 group-hover:text-emerald-600" />
                                        <span className="text-base font-semibold">Dashboard</span>
                                    </Link>
                                    <Link to="/analytics" className="flex items-center gap-3 p-3 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-bold transition-all duration-200">
                                        <BarChart3 size={20} className="text-slate-400 group-hover:text-emerald-600" />
                                        <span className="text-base font-semibold">Analytics</span>
                                    </Link>
                                    <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-bold transition-all duration-200">
                                        <User size={20} className="text-slate-400 group-hover:text-emerald-600" />
                                        <span className="text-base font-semibold">Profile</span>
                                    </Link>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3.5 mt-2">
                                    <Link to="/login" className="w-full">
                                        <button className='w-full font-bold border border-slate-200 hover:border-slate-300 text-slate-700 py-3 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer'>
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/register" className="w-full">
                                        <button className='w-full font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-3 rounded-xl shadow-lg shadow-emerald-100 transition-all duration-200 cursor-pointer'>
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Nav