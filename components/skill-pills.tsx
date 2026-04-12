"use client";

import { Stagger, StaggerItem } from "@/components/ui/motion-wrapper";
import { FadeIn } from "@/components/ui/motion-wrapper";
import { motion } from "framer-motion";

interface SkillGroup {
  category: string;
  label: string;
  skills: { _id: string; name: string; highlighted: boolean }[];
}

const categoryShadow: Record<string, string> = {
  frontend: "shadow-brutal",
  backend: "shadow-brutal-indigo",
  "database-cloud": "shadow-brutal",
  "ai-testing": "shadow-brutal",
};

export function SkillPills({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="mt-8 space-y-6">
      {groups.map((group) => (
        <FadeIn key={group.category} direction="up">
          <div className="text-[10px] font-extrabold text-text-muted tracking-[1.5px] mb-3">{group.label}</div>
          <Stagger staggerDelay={0.05} className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <StaggerItem key={skill._id}>
                <motion.span
                  whileHover={{ y: -2 }}
                  className={`inline-block px-4 py-2 border-brutal text-xs font-extrabold ${categoryShadow[group.category]} ${
                    skill.highlighted
                      ? group.category === "backend" ? "bg-secondary text-white" : "bg-primary"
                      : "bg-white"
                  }`}
                >
                  {skill.name}
                </motion.span>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeIn>
      ))}
    </div>
  );
}
