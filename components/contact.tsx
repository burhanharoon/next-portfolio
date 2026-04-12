"use client";

import { SOCIAL_LINKS } from "@/lib/constants";
import { BrutalButton } from "@/components/ui/brutal-button";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion-wrapper";

export function Contact() {
  return (
    <section id="contact" className="bg-bg-dark px-6 py-20 md:py-28 text-center">
      <div className="mx-auto max-w-2xl">
        <FadeIn direction="up">
          <span className="inline-block px-3.5 py-1.5 bg-primary border-[2.5px] border-primary text-xs font-extrabold shadow-[3px_3px_0_var(--color-secondary)]">
            LET&apos;S WORK TOGETHER
          </span>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <h2 className="mt-5 text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Got a project in mind?<br /><span className="text-primary">Let&apos;s talk.</span>
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="mt-4 text-sm text-[#888] leading-relaxed">
            Available for freelance work and full-time remote roles worldwide.<br />
            GMT+5 · Typically responds within 24 hours.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <BrutalButton href={`mailto:${SOCIAL_LINKS.email}`} variant="secondary" shadow="indigo" className="bg-primary text-text-primary border-primary">
              EMAIL ME →
            </BrutalButton>
            <BrutalButton href={`mailto:${SOCIAL_LINKS.email}`} variant="ghost" shadow="black">
              SCHEDULE A CALL
            </BrutalButton>
          </div>
        </FadeIn>

        <Stagger staggerDelay={0.1} className="mt-7 flex gap-3 justify-center">
          {[
            { label: "in", href: SOCIAL_LINKS.linkedin },
            { label: "gh", href: SOCIAL_LINKS.github },
            { label: "dev", href: SOCIAL_LINKS.devto },
            { label: "✉", href: `mailto:${SOCIAL_LINKS.email}` },
          ].map((social) => (
            <StaggerItem key={social.label}>
              <a href={social.href} target={social.label === "✉" ? undefined : "_blank"} rel={social.label === "✉" ? undefined : "noopener noreferrer"}
                className="w-11 h-11 bg-[#222] border-[2px] border-[#444] flex items-center justify-center text-sm font-extrabold text-[#888] hover:text-white hover:border-[#666] transition-colors">
                {social.label}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
