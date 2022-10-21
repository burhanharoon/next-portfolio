import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const linkClassName = 'text-gray-500 hover:text-blue-500'

  return (
    <footer className='flex items-center justify-center w-full bg-[#EFF6FF]'>
      <div className='max-w-[1400px] flex flex-col w-full'>
        <div className='px-6 py-10'>
          <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-none gap-8 pt-6'>
            <h1 className='name font-bold text-xl col-span-full lg:col-span-1'>
              Burhan Haroon
            </h1>
            <section className='flex flex-col text-sm gap-2'>
              <p className='font-semibold text-gray-600 pb-2'>Navigation</p>
              <Link href='/'>
                <a className={linkClassName}>Home</a>
              </Link>
              <a
                href='https://dev.to/burhanharoon'
                target='_blank'
                rel='noreferrer'
                className={linkClassName}
              >
                Blogs
              </a>
              <a
                href='https://wa.me/+923164180039?text=Hello%2C%20World!'
                target='_blank'
                rel='noreferrer'
                className={linkClassName}
              >
                Contact Me
              </a>
            </section>
            <section className='flex flex-col text-sm gap-2'>
              <p className='font-semibold text-gray-600 pb-2'>
                Social Platforms
              </p>
              <a
                href='https://www.linkedin.com/in/burhandev'
                target='_blank'
                rel='noreferrer'
                className={linkClassName}
              >
                Linkedin
              </a>
              <a
                href='https://instagram.com/kya.bne.ga.burhan.tera?igshid=YmMyMTA2M2Y='
                target='_blank'
                rel='noreferrer'
                className={linkClassName}
              >
                Instagram
              </a>
              <a
                href='https://github.com/burhanharoon'
                target='_blank'
                rel='noreferrer'
                className={linkClassName}
              >
                Github
              </a>
            </section>
            <section className='flex flex-col text-sm gap-2'>
              <p className='font-semibold text-gray-600 pb-2'>Contact Us</p>
              <p className='text-gray-500'>Lahore, Pakistan </p>
              <p>
                <a
                  href='mailto:mirzaburhan0007@gmail.com'
                  className={linkClassName}
                >
                  mirzaburhan0007@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
        <hr className='border-gray-300' />
        <p className='text-sm px-6 py-5'>Copyright &copy; 2022 Burhan Haroon</p>
      </div>
    </footer>
  )
}

export default Footer
