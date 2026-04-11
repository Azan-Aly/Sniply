import React from 'react'
import Icon from './Icon'
import Nav from './Nav'

const Header = () => {
  return (
    <div className='flex justify-between items-center mx-4 my-2'>
      <Icon />
      <Nav />
    </div>
  )
}

export default Header