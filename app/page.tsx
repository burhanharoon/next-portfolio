import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { BlogPreview } from "@/components/blog-preview";

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <About />
      <Projects />
      <Skills />
      <BlogPreview />
    </>
  );
}
