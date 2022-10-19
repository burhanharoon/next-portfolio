import * as React from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [colorChange, setColorchange] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen]= React.useState(false)

    const changeNavbarColor = () =>{
        if(window.scrollY >= 100){
          setColorchange(true);
        }
        else{
          setColorchange(false);
        }
     };

     React.useEffect(() => {
         window.addEventListener('scroll', changeNavbarColor);
         return () => window.removeEventListener('scroll', changeNavbarColor)
     }, [])

    return (
      <nav
        className={`text-darkBlue flex justify-between p-4 border-b-2 border-b-white sticky top-0 w-full navbar ${
          colorChange ? 'bg-white' : 'bg-[#EFF6FF]'
        } `}
      >
        <h1 className="name text-2xl">Burhan Haroon</h1>
        <nav className="hidden sm:flex gap-5 text-lg">
          <Link href="/">Home</Link>
          <Link href="https://dev.to/burhanharoon">
            <a target="_blank"> Blogs</a>
          </Link>

          <Link href="https://www.linkedin.com/in/burhandev" target="_blank">
            <a target="_blank">Contact Me</a>
          </Link>
        </nav>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} ariaLabel='menu open/close' >
        <svg
          className="block sm:hidden h-6 w-6"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
      
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg> 
            </button>
            { isMenuOpen &&  <div className='absolute top-20 right-4 w-64 bg-white p-4 flex items-center rounded-md'>
              <div className='w-full'>
              <h2 className="name text-lg pl-2">Burhan Haroon</h2>
              <p className='py-2 my-2 pl-2 hover:bg-sky-100 w-full rounded-md'><Link href="/" >Home</Link></p>
              <p className='py-2 my-2 pl-2 hover:bg-sky-100 w-full rounded-md'>
                <Link href="https://dev.to/burhanharoon">
                  <a target="_blank"> Blogs</a>
                </Link>
              </p>
              <p className='py-2 my-2 pl-2 hover:bg-sky-100 w-full rounded-md'>
                <Link href="https://www.linkedin.com/in/burhandev" target="_blank">
                  <a target="_blank">Contact Me</a>
                </Link>
              </p>
              </div>



            </div>}
      </nav>
    );
}

export default Navbar
