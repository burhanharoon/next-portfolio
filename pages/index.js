import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Navbar from '../components/Navbar';


export default function Home() {
  return (
    <>
      <Navbar />

      <section className='text-darkBlue bg-[#EFF6FF] h-full md:h-[600px] p-4 sm:p-12 flex flex-col gap-8 justify-center '>
        <div className=' flex flex-col md:flex-row gap-12 md:gap-28 items-center'>
          <div className='w-full md:w-[50%] leading-relaxed flex flex-col gap-8'>
            <h1 className='font-semibold text-2xl sm:text-5xl '>Hi, Im Burhan Haroon - a Software Engineer</h1>
            <p className='text-base sm:text-lg'>I&apos;m a self taught computer programmer and a Final year Computer Science student at UET Lahore. I wrote my first code at the age 12 in a programming language called GW-BASIC. I love to develop webs and favorite tech stack is MERN. Other than that I'm a cummunity builder and have a positive mindset towards growing and learning. Lastly, i sometimes write tech articles on dev.to 📝</p>
            <div className='flex flex-col gap-2 md:flex-row'>
              <button className="btn btn-primary normal-case">Download Resume</button>
              <button className="btn btn-primary normal-case">Contact me</button>
            </div>
          </div>
          <div className='bg-black w-[70%] md:w-[25%] rounded-full'>
            <Image src='/burhan.jpg' width="100%" height="100%" layout="responsive" objectFit="cover" alt='Burhan Haroon' className='rounded-full' />
          </div>
        </div>
      </section>

      <section className='p-4 '>
        <h1 className='font-semibold text-center text-2xl sm:text-3xl text-darkBlue'>What are the Technoloies and Tools that I use?</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4 '>

          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg border-2 border-gray-50 hover:border-blue-100'>
            <div className='w-14 h-14 bg-black '>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>
          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg'>
            <div className='w-14 h-14 bg-black'>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>
          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg'>
            <div className='w-14 h-14 bg-black'>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>
          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg'>
            <div className='w-14 h-14 bg-black'>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>
          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg'>
            <div className='w-14 h-14 bg-black'>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>
          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg'>
            <div className='w-14 h-14 bg-black'>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>
          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg'>
            <div className='w-14 h-14 bg-black'>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>
          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg'>
            <div className='w-14 h-14 bg-black'>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>
          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg'>
            <div className='w-14 h-14 bg-black'>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>
          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg'>
            <div className='w-14 h-14 bg-black'>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>
          <div className='flex flex-col gap-2 shadow-md p-3 rounded-lg'>
            <div className='w-14 h-14 bg-black'>            </div>
            <h3 className='font-bold'>React JS</h3>
            <p>I use React JS to develop elegant frontend and integrating API into web apps.</p>
          </div>

        </div>

      </section>

    </>

  )
}
