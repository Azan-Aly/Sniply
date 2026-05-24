import React from 'react'
import Icon from './Icon'
import Nav from './Nav'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all duration-300'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3.5'>
        <Icon />
        <Nav />
      </div>
    </header>
  )
}

export default Header