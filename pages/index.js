import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="text-darkBlue bg-[#EFF6FF] h-full md:h-[600px] p-4 sm:p-12 flex flex-col gap-8 justify-center ">
        <div className=" flex flex-col md:flex-row gap-12 md:gap-28 items-center">
          <div className="w-full md:w-[50%] leading-relaxed flex flex-col gap-8">
            <h1 className="font-semibold text-2xl sm:text-5xl ">
              Hi, Im Burhan Haroon - a Software Engineer
            </h1>
            <p className="text-base sm:text-lg">
              I& m a self taught computer programmer and a Final year
              Computer Science student at UET Lahore. I wrote my first code at
              the age 12 in a programming language called GW-BASIC. I love to
              develop webs and favorite tech stack is MERN. Other than that I am
              a cummunity builder and have a positive mindset towards growing
              and learning. Lastly, i sometimes write tech articles on dev.to 📝
            </p>
            <div className="flex flex-col gap-2 md:flex-row">
              <button className="btn btn-primary normal-case">
                Download Resume
              </button>
              <button className="btn btn-primary normal-case">
                <Link
                  href="https://www.linkedin.com/in/burhandev"
                  target="_blank"
                >
                  <a target="_blank">Contact Me</a>
                </Link>
              </button>
            </div>
          </div>
          <div className="bg-black w-[70%] md:w-[25%] rounded-full overflow-hidden">
            <Image
              src="/burhan.jpg"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="cover"
              alt="Burhan Haroon"
              className="rounded-full hover:scale-110 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      <section className="p-4 ">
        <h1 className="font-semibold text-center text-2xl sm:text-3xl text-darkBlue">
          What are the Technoloies and Tools that I use?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4 ">
          <div className="flex flex-col gap-2 shadow-md p-3 rounded-lg border-2 border-gray-50 hover:border-blue-400">
            <div className="w-14 h-14 flex justify-center items-center ">
              <img src="/React.png" alt="" />
            </div>
            <h3 className="font-bold bg-[#EFF6FF] text-black w-fit p-2 rounded-md">
              React JS
            </h3>
            <p>I have good experience using React Hooks, Router and Redux</p>
          </div>

          <div className="flex flex-col gap-2 shadow-md p-3 rounded-lg border-2 border-gray-50   hover:border-blue-400">
            <div className="w-14 h-14 flex justify-center items-center">
              <img src="/Frontend.png" alt="" />
            </div>
            <h3 className="font-bold bg-[#EFF6FF] text-black w-fit p-2 rounded-md">
              FRONT-END
            </h3>
            <p>I know Html, CSS, SASS, JavaScript, Bootstrap, TailwindCSS</p>
          </div>

          <div className="flex flex-col gap-2 shadow-md p-3 rounded-lg border-2 border-gray-50   hover:border-blue-400">
            <div className="w-14 h-14 flex justify-center items-center">
              <img src="/Backend.png" alt="" />
            </div>
            <h3 className="font-bold bg-[#EFF6FF] text-black w-fit p-2 rounded-md">
              BACKEND
            </h3>
            <p>
              I have good knowledge of NodeJS, MongoDB, ExpressJS and GraphQL
            </p>
          </div>

          <div className="flex flex-col gap-2 shadow-md p-3 rounded-lg border-2 border-gray-50   hover:border-blue-400">
            <div className="w-14 h-14 flex justify-center items-center">
              <img src="/C.png" alt="" />
            </div>
            <h3 className="font-bold bg-[#EFF6FF] text-black w-fit p-2 rounded-md">
              C/C++/C#
            </h3>
            <p>Have developed both simple and complex apps using C and C++</p>
          </div>
        </div>
      </section>
    </>
  );
}
