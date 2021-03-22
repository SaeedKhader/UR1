import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconLookup } from '@fortawesome/fontawesome-svg-core'

class Header extends React.Component {
  render() {
    const icon: IconLookup = { prefix: 'fas', iconName: 'search' }
    return (
      <header
        className='w-full h-20 bg-white rounded-b-2xl'
        style={{ boxShadow: '0px 10px 10px 0px rgba(50, 50, 50, 0.02)' }}>
        <nav className='container flex items-center justify-between h-full px-8 mx-auto'>
          <div className='flex items-center'>
            <svg
              className='w-10 h-10 text-green-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path d='M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z' />
            </svg>
            <h1 className='mb-1 ml-1 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600'>
              My Reeds
            </h1>
          </div>
          <Link
            to='/search'
            className='flex items-center text-gray-700 hover:text-green-600'>
            <FontAwesomeIcon icon={icon} color={'currentColor'} />
            Search
          </Link>
        </nav>
      </header>
    )
  }
}

export default Header
