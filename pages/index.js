import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Navbar from '../components/Navbar';


export default function Home() {
  return (
    <>
      <Navbar />

      <div className='text-darkBlue bg-[#EFF6FF] h-full md:h-[600px] p-4 sm:p-12 flex flex-col gap-8 justify-center '>

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


      </div>

    </>

  )
}
