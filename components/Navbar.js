import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [changeColor, setColorChange] = useState(false);

  const changeNavbarColor = () =>
    window.scrollY >= 80 ? setColorChange(true) : setColorChange(false);

  useEffect(() => {
    window.addEventListener('scroll', changeNavbarColor);
    return () => window.removeEventListener('scroll', changeNavbarColor);
  }, []);

  return (
    <nav
      className={`text-darkBlue flex justify-between p-4 sticky top-0 w-full navbar transition-all ease-linear duration-300 ${
        changeColor ? 'bg-white shadow-lg' : 'bg-[#EFF6FF] shadow-none'
      } `}
    >
      <h1 className='name text-2xl'>Burhan Haroon</h1>
      <nav className='hidden sm:flex gap-5 text-lg'>
        <Link href='/'>Home</Link>
        <a href='https://dev.to/burhanharoon' target='_blank' rel='noreferrer'>
          Blogs
        </a>
        <a
          href='https://www.linkedin.com/in/burhandev'
          target='_blank'
          rel='noreferrer'
        >
          Contact Me
        </a>
      </nav>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        ariaLabel='menu open/close'
      >
        <svg
          className='block sm:hidden h-6 w-6'
          stroke='currentColor'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          ></path>
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
