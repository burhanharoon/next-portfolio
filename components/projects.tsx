import { getProjects } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";
import { Badge } from "@/components/ui/badge";
import { ProjectCards } from "@/components/project-cards";

export async function Projects() {
  const projects = await getProjects();

  const displayProjects = projects.length > 0
    ? projects.map((p) => ({
        title: p.title,
        description: p.description,
        techStack: p.techStack,
        url: p.url,
        imageUrl: p.image ? urlFor(p.image).width(600).height(340).url() : null,
      }))
    : [
        { title: "Aires", description: "Property booking platform for users, brokers, buyers & sellers.", techStack: ["React", "Next.js", "Node.js", "MongoDB"], url: null, imageUrl: null },
        { title: "Festful", description: "Event management app for planning, hiring, and sharing events.", techStack: ["React Native", "Node.js", "WebRTC", "GCP"], url: "https://festfulweb.netlify.app/", imageUrl: null },
        { title: "Blocksight", description: "Crypto analytics platform to discover profitable opportunities early.", techStack: ["React", "TypeScript", "Node.js", "Blockchain"], url: "https://blocksight.com/", imageUrl: null },
        { title: "SellGauge", description: "Car selling platform with competitive bidding & real-time analytics.", techStack: ["React", "Python", "Django", "Playwright"], url: "https://www.sellgauge.com/", imageUrl: null },
      ];

  return (
    <section id="projects" className="bg-bg-secondary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Badge variant="indigo">MY WORK</Badge>
        <h2 className="mt-3 text-2xl md:text-3xl font-black tracking-tight">Projects I&apos;ve shipped.</h2>
        <ProjectCards projects={displayProjects} />
      </div>
    </section>
  );
}
