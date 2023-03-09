import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import HamburgerIcon from 'assets/icons/hamburger'
import CrossIcon from 'assets/icons/cross'
import { socialMediaHandles } from './socialMedia'

const Navbar = () => {
  const [colorChange, setColorChange] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const debounce = (func, wait) => {
    let timeout
    return function (...args) {
      const context = this
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(context, args), wait)
    }
  }

  const debouncedChangeNavbarColor = useCallback(
    debounce(() => {
      setColorChange(window.scrollY >= 80)
    }, 100),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', debouncedChangeNavbarColor)
    return () =>
      window.removeEventListener('scroll', debouncedChangeNavbarColor)
  }, [debouncedChangeNavbarColor])

  return (
    <nav
      className={`text-darkBlue flex justify-center  p-4 sticky top-0 w-full navbar transition-all ease-linear duration-300 ${
        colorChange ? 'bg-white shadow-lg' : 'bg-[#EFF6FF] shadow-none'
      }  `}
      style={{ alignItems: 'center !important' }}
    >
      <div
        className={`
      ${
        isMenuOpen
          ? 'bg-white sm:bg-transparent p-3 sm:p-0 drop-shadow-md sm:drop-shadow-none'
          : 'bg-transparent'
      } w-full max-w-[1369px] rounded-t-lg relative flex justify-between transition-all ease-linear  `}
      >
        <h1 className='name text-xl sm:text-2xl w-full sm:w-[25%] md:w-[45%]'>
          Burhan Haroon
        </h1>
        <nav
          className={`${
            isMenuOpen
              ? 'bg-white sm:bg-transparent flex gap-4 sm:gap-5 flex-col sm:flex-row top-[3rem] sm:top-0 absolute sm:relative m-auto sm:m-0 left-0 right-0 rounded-b-lg p-3 sm:p-0 text-base sm:text-lg'
              : 'hidden sm:flex gap-5 text-lg'
          } transition-all ease-linear w-full sm:w-[72%] md:w-[70%] justify-between`}
          style={{ alignItems: 'center !important' }}
        >
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto'>
            <Link href='/'>
              <div className='hover:bg-blue-50 p-2 sm:p-0 rounded-md w-full text-center sm:w-auto hover:cursor-pointer'>
                Home
              </div>
            </Link>
            <a
              href='https://dev.to/burhanharoon'
              target='_blank'
              rel='noreferrer'
              className='hover:bg-blue-50 p-2 sm:p-0 rounded-md w-full text-center sm:w-auto'
            >
              Blogs
            </a>
            <a
              href='https://wa.me/+923164180039?text=Hello%2C%20Burhan!'
              target='_blank'
              rel='noreferrer'
              className='hover:bg-blue-50 p-2 sm:p-0 rounded-md w-full text-center sm:w-auto'
            >
              Contact Me
            </a>
          </div>
          <div className='flex items-center justify-center gap-4'>
            {socialMediaHandles.map((social) => (
              <a
                key={social.title}
                href={social.url}
                target='_blank'
                rel='noreferrer'
                className='hover:scale-110 transform transition-all ease-linear'
              >
                {social.icon}
              </a>
            ))}
          </div>
        </nav>
        <button
          className='block sm:hidden h-8 w-8 hover:bg-blue-50 p-1 rounded-md'
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <CrossIcon /> : <HamburgerIcon />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
