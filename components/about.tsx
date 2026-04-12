import { getAbout } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
import { AboutAnimations } from "@/components/about-animations";

export async function About() {
  const about = await getAbout();

  const headline = about?.headline ?? "I'm a full-stack developer who treats AI as a superpower, not a buzzword.";

  const stats = about?.stats ?? [
    { value: "7+", label: "YEARS" },
    { value: "10+", label: "PROJECTS" },
    { value: "5+", label: "COUNTRIES" },
    { value: "AI", label: "ENHANCED" },
  ];

  const fallbackBody = [
    "With 7+ years of building web applications, I've evolved from writing every line by hand to leveraging AI tools that let me ship 3x faster. I've trained LLMs at Turing, built full-stack products from scratch for global clients, and I bring that same AI-enhanced mindset to every project.",
    "I'm not just a developer who uses ChatGPT — I understand how these models work, how to prompt effectively, and how to integrate AI into development workflows for real productivity gains.",
  ];

  return (
    <section id="about" className="bg-bg-primary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="md:min-w-[180px]">
          <Badge variant="yellow">ABOUT ME</Badge>
        </div>
        <AboutAnimations headline={headline} stats={stats}>
          {about?.body ? (
            <div className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl space-y-4">
              <PortableText value={about.body} />
            </div>
          ) : (
            <div className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl space-y-4">
              {fallbackBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </AboutAnimations>
      </div>
    </section>
  );
}
