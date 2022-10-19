import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import SkillCard from '../components/SkillCard';
import { skills } from '../utils/skills';
import userImage from '../assets/images/user.jpg';

const Home = () => (
  <>
    <Head>
      <title>Burhan Haroon | Software Engineer</title>
      <meta name='description' content='Burhan Haroon | Portfolio' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Navbar />
    <section className='text-darkBlue bg-[#EFF6FF] h-full min-h-[600px] p-4 pt-8 sm:p-12 flex flex-col gap-8 justify-center'>
      <div className=' flex flex-col md:flex-row gap-12 md:gap-28 items-center'>
        <div className='w-full md:w-[50%] leading-relaxed flex flex-col gap-8'>
          <h1 className='font-semibold text-2xl sm:text-5xl '>
            Hi, Im Burhan Haroon - a Software Engineer
          </h1>
          <p className='text-base sm:text-lg'>
            I am a self taught computer programmer and a Final year Computer
            Science student at UET Lahore. I wrote my first code at the age 12
            in a programming language called GW-BASIC. I love to develop webs
            and favorite tech stack is MERN. Other than that I am a community
            builder and have a positive mindset towards growing and learning.
            Lastly, I sometimes write tech articles @ dev.to 📝
          </p>
          <div className='flex flex-col gap-2 md:flex-row'>
            <button className='btn btn-primary normal-case'>
              Download Resume
            </button>
            <a
              href='https://www.linkedin.com/in/burhandev'
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
        <div className='bg-black w-[60%] md:w-[35%] xl:w-[25%] rounded-full overflow-hidden'>
          <Image
            src={userImage}
            width='100%'
            height='100%'
            layout='responsive'
            objectFit='cover'
            alt='Burhan Haroon'
            className='rounded-full hover:scale-110 transition-all duration-500'
          />
        </div>
      </div>
    </section>

    <section className='p-6 md:p-12'>
      <h1 className='font-semibold text-center text-2xl sm:text-3xl text-darkBlue my-4 mb-8 max-w-[22rem] m-auto sm:max-w-auto'>
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
    </section>
  </>
);

export default Home;
