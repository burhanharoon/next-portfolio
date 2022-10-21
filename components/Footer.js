import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col bg-[#EFF6FF]">
      <div className="px-12 py-5 block lg:hidden">
        <h1 className="font-bold">Burhan Haroon</h1>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:p-12 px-12 gap-y-5 sm:space-y-0">
        <div className="hidden lg:block">
          <h1 className="font-bold">Burhan Haroon</h1>
        </div>
        <section className="flex flex-col space-y-4 text-sm">
          <p className="font-bold">Navigation</p>
          <a href="/">Home</a>
          <a href="https://dev.to/burhanharoon" target="_blank" rel="noreferrer">
            Blogs
          </a>
          <a href="https://wa.me/+923164180039?text=Hello%2C%20World!" target="_blank" rel="noreferrer">
            Contact Me
          </a>
        </section>
        <section className="flex flex-col space-y-4 text-sm">
          <p className="font-bold">Social Platforms</p>
          <a href="https://www.linkedin.com/in/burhandev" target="_blank">
            Linkedin
          </a>
          <Link href="">Medium</Link>
          <a href="https://instagram.com/kya.bne.ga.burhan.tera?igshid=YmMyMTA2M2Y=" target="_blank">Instagram</a>
          <a href="https://github.com/burhanharoon" target="_blank">Github</a>
        </section>
        <section className="flex flex-col space-y-4 text-sm">
          <p className="font-bold">Contact Us</p>
          <p>Lahore, Pakistan </p>
          <p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mirzaburhan007@gmail.com">
              mirzaburhan007@gmail.com
            </a>
          </p>
        </section>
      </div>
      <hr className="border-gray-300" />
      <p className="px-12 py-3 text-sm">copyright &copy; 2022 burharoon</p>
    </div>
  );
};

export default Footer;
