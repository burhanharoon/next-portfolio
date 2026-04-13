import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { BlogPreview } from "@/components/blog-preview";
import { Contact } from "@/components/contact";
import { TrackSection } from "@/components/ui/track-section";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Burhan Haroon",
  url: SITE_URL,
  jobTitle: "Full-Stack Developer",
  description: "AI-first full-stack developer with 7+ years of experience, available for remote work worldwide.",
  sameAs: [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.github,
    SOCIAL_LINKS.devto,
  ],
  knowsAbout: ["React", "Next.js", "Node.js", "TypeScript", "Python", "AI", "LLM", "Full-Stack Development"],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Companies />
      <TrackSection id="about" />
      <About />
      <TrackSection id="projects" />
      <Projects />
      <Skills />
      <TrackSection id="blog" />
      <BlogPreview />
      <TrackSection id="contact" />
      <Contact />
    </>
  );
}
