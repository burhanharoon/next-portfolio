"use client";

import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/ui/motion-wrapper";

interface ProjectDisplay {
  title: string;
  description: string;
  techStack: string[];
  url: string | null;
  imageUrl: string | null;
}

const gradients = ["from-yellow-100 to-yellow-200", "from-indigo-100 to-indigo-200", "from-indigo-100 to-indigo-200", "from-yellow-100 to-yellow-200"];
const shadows = ["shadow-brutal", "shadow-brutal-indigo", "shadow-brutal-indigo", "shadow-brutal"];

export function ProjectCards({ projects }: { projects: ProjectDisplay[] }) {
  return (
    <Stagger staggerDelay={0.15} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {projects.map((project, i) => (
        <StaggerItem key={project.title}>
          <motion.div
            whileHover={{ y: -4, boxShadow: "8px 8px 0 var(--color-border)" }}
            transition={{ duration: 0.2 }}
            className={`bg-white border-brutal ${shadows[i % shadows.length]} overflow-hidden cursor-pointer`}
          >
            <div className={`h-36 md:h-40 border-b-[2.5px] border-border flex items-center justify-center overflow-hidden ${project.imageUrl ? "" : `bg-gradient-to-br ${gradients[i % gradients.length]}`}`}>
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-black text-text-primary opacity-10 tracking-tight text-center">{project.title.toUpperCase()}</span>
              )}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-black">{project.title}</h3>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-primary border-brutal-thin text-[9px] font-extrabold shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    onClick={(e) => e.stopPropagation()}
                    data-umami-event={`project-live-${project.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    LIVE ↗
                  </a>
                )}
              </div>
              <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-bg-secondary border-[1.5px] border-border text-[8px] font-bold">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
