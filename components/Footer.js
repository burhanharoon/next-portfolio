import React from 'react'
import Link from 'next/link'
import { DevToURL, GitHubURL, InstagramURL, LinkedInURL } from 'utils/constants'

const Footer = () => {
  const linkClassName = 'text-gray-500 hover:text-blue-500'

  return (
    <footer className='flex mt-auto items-center justify-center w-full bg-[#EFF6FF]'>
      <div className='max-w-[1400px] flex flex-col w-full'>
        <div className='px-6 py-10'>
          <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-none gap-8 pt-6'>
            <h1 className='name font-bold text-xl col-span-full lg:col-span-1'>
              Burhan Haroon
            </h1>
            <section className='flex flex-col text-sm gap-2'>
              <p className='font-semibold text-gray-600 pb-2'>Navigation</p>
              <Link href='/'>
                <div className={linkClassName}>Home</div>
              </Link>
              <a
                href={DevToURL}
                target='_blank'
                rel='noreferrer'
                className={linkClassName}
              >
                Blogs
              </a>
              <a
                href='https://wa.me/+923164180039?text=Hello%2C%20Burhan!'
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
                href={LinkedInURL}
                target='_blank'
                rel='noreferrer'
                className={linkClassName}
              >
                Linkedin
              </a>
              <a
                href={InstagramURL}
                target='_blank'
                rel='noreferrer'
                className={linkClassName}
              >
                Instagram
              </a>
              <a
                href={GitHubURL}
                target='_blank'
                rel='noreferrer'
                className={linkClassName}
              >
                Github
              </a>
            </section>
            <section className='flex flex-col text-sm gap-2'>
              <p className='font-semibold text-gray-600 pb-2'>Contact Us</p>
              <p>
                <a
                  href='mailto:burhanharoon@outlook.com?Subject=Hello%20Burhan%20Haroon'
                  className={linkClassName}
                >
                  burhanharoon@outlook.com
                </a>
              </p>
              <p className='text-gray-500'>Lahore, Pakistan </p>
            </section>
          </div>
        </div>
        <hr className='border-gray-300' />
        <p className='text-sm px-6 py-5'>Copyright &copy; 2023 Burhan Haroon</p>
      </div>
    </footer>
  )
}

export default Footer
