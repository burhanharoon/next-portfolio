import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <About />
      <Projects />
    </>
  );
}
