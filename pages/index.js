import Head from 'next/head'
import Image from "next/image"
import SkillCard from 'components/SkillCard'
import { skills } from 'utils/skills'
import userImage from 'assets/images/user.jpg'
import Link from 'next/link'
import { LinkedInURL } from 'utils/constants'

const Home = () => (
  <>
    <Head>
      <title>Burhan Haroon | Software Engineer</title>
      <meta name='description' content='Burhan Haroon | Portfolio' />
      <link rel='icon' href='/burhan.jpg' />
    </Head>
    <section className='text-darkBlue bg-[#EFF6FF] h-full min-h-[600px] p-4 pt-8 sm:p-12 flex flex-col gap-8 justify-center items-center'>
      <div className=' flex flex-col-reverse md:flex-row gap-12 md:gap-28 items-center max-w-[1369px]'>
        <div className='w-full md:w-[50%] leading-relaxed flex flex-col gap-8'>
          <h1 className='font-semibold text-2xl sm:text-5xl '>
            Hi, I'm Burhan Haroon - a Software Engineer.
          </h1>
          <p className='text-base sm:text-lg'>
            As a self-taught computer programmer and Computer Science graduate
            from UET Lahore, I've been passionate about coding since I wrote my
            first program at the age of 12 in GW-BASIC. My preferred tech stack
            is MERN and I love developing websites. Additionally, I enjoy
            building communities and have a positive mindset towards growth and
            learning. In my spare time, I also write tech articles on dev.to.
          </p>
          <div className='flex flex-col gap-2 md:flex-row'>
            <button className='btn btn-primary normal-case'>
              <Link
                href='/Burhan Haroon - Software Engineer.pdf'
                download={true}
              >
                Download Resume
              </Link>
            </button>
            <a
              href={LinkedInURL}
              target='_blank'
              className='w-full'
              rel='noreferrer'
            >
              <button className='btn btn-primary normal-case w-full md:w-auto'>
                Contact Me
              </button>
            </a>
          </div>
        </div>
        <div className='avatar w-[60%] md:w-[35%] xl:w-[25%] '>
          <div className='bg-black rounded-full overflow-hidden'>
            <Image
              src={userImage}
              priority={true}
              alt='Burhan Haroon'
              className='rounded-full hover:scale-110 transition-all duration-500'
              sizes="100vw"
              style={{
                objectFit: "cover",
              }} />
          </div>
        </div>
      </div>
    </section>

    <section className='p-6 md:p-12 max-w-[1469px] m-auto'>
      <h1 className='font-semibold text-center text-2xl sm:text-3xl text-darkBlue my-4 mb-8 max-w-[22rem] m-auto sm:max-w-full'>
        What are the Tools & Technologies that I use?
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {skills.map((skill) => (
          <SkillCard
            key={skill.title}
            title={skill.title}
            description={skill.description}
            icon={skill.icon}
          />
        ))}
      </div>
      <div></div>
    </section>
  </>
)

export default Home
