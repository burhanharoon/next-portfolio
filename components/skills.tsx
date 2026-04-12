import { getSkills } from "@/sanity/queries";
import { Badge } from "@/components/ui/badge";
import { SkillPills } from "@/components/skill-pills";
import type { Skill } from "@/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  frontend: "FRONTEND",
  backend: "BACKEND",
  "database-cloud": "DATABASE & CLOUD",
  "ai-testing": "AI & TESTING",
};

const CATEGORY_ORDER = ["frontend", "backend", "database-cloud", "ai-testing"];

const FALLBACK_SKILLS: Skill[] = [
  { _id: "1", name: "React", category: "frontend", highlighted: false, order: 1 },
  { _id: "2", name: "Next.js", category: "frontend", highlighted: false, order: 2 },
  { _id: "3", name: "React Native", category: "frontend", highlighted: false, order: 3 },
  { _id: "4", name: "TypeScript", category: "frontend", highlighted: true, order: 4 },
  { _id: "5", name: "Tailwind CSS", category: "frontend", highlighted: false, order: 5 },
  { _id: "6", name: "Redux", category: "frontend", highlighted: false, order: 6 },
  { _id: "7", name: "Node.js", category: "backend", highlighted: false, order: 1 },
  { _id: "8", name: "Express.js", category: "backend", highlighted: false, order: 2 },
  { _id: "9", name: "Python", category: "backend", highlighted: true, order: 3 },
  { _id: "10", name: "GraphQL", category: "backend", highlighted: false, order: 4 },
  { _id: "11", name: "Django", category: "backend", highlighted: false, order: 5 },
  { _id: "12", name: "PostgreSQL", category: "database-cloud", highlighted: false, order: 1 },
  { _id: "13", name: "MongoDB", category: "database-cloud", highlighted: false, order: 2 },
  { _id: "14", name: "AWS", category: "database-cloud", highlighted: false, order: 3 },
  { _id: "15", name: "GCP", category: "database-cloud", highlighted: false, order: 4 },
  { _id: "16", name: "LLM / AI Tools", category: "ai-testing", highlighted: true, order: 1 },
  { _id: "17", name: "Cypress", category: "ai-testing", highlighted: false, order: 2 },
  { _id: "18", name: "Playwright", category: "ai-testing", highlighted: false, order: 3 },
  { _id: "19", name: "CI/CD", category: "ai-testing", highlighted: false, order: 4 },
];

export async function Skills() {
  const skills = await getSkills();
  const displaySkills = skills.length > 0 ? skills : FALLBACK_SKILLS;

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    skills: displaySkills.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" className="bg-bg-primary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Badge variant="yellow">TECH STACK</Badge>
        <h2 className="mt-3 text-2xl md:text-3xl font-black tracking-tight">Tools I work with.</h2>
        <SkillPills groups={grouped} />
      </div>
    </section>
  );
}
