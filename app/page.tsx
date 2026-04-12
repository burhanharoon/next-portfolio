import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { BlogPreview } from "@/components/blog-preview";
import { Contact } from "@/components/contact";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Burhan Haroon",
  url: "https://burhanharoon.dev",
  jobTitle: "Full-Stack Developer",
  description: "AI-first full-stack developer with 7+ years of experience, available for remote work worldwide.",
  sameAs: [
    "https://www.linkedin.com/in/burhanharoon",
    "https://github.com/burhanharoon",
    "https://dev.to/burhanharoon",
  ],
  knowsAbout: ["React", "Next.js", "Node.js", "TypeScript", "Python", "AI", "LLM", "Full-Stack Development"],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Companies />
      <About />
      <Projects />
      <Skills />
      <BlogPreview />
      <Contact />
    </>
  );
}
