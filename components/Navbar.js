import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className='text-darkBlue flex justify-between bg-[#EFF6FF] p-4 border-2 border-b-white'>
            <h1 className='name text-2xl'>Burhan Haroon</h1>
            <nav className='hidden sm:flex gap-5 text-lg'>
                <Link href='/'>Home</Link>
                <Link href='https://dev.to/burhanharoon'>
                    <a target="_blank"> Blogs</a>
                </Link>


                <Link href="https://www.linkedin.com/in/burhandev" target="_blank">
                <a target="_blank">Contact Me</a>
                </Link>
            </nav>
            <svg className="block sm:hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </nav>
    )
}

export default Navbar