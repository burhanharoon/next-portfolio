"use client";

import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { BrutalButton } from "@/components/ui/brutal-button";
import { FadeIn, SpringIn, Stagger, StaggerItem } from "@/components/ui/motion-wrapper";

export function Hero() {
  return (
    <section id="home" className="bg-bg-primary px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start gap-12 md:gap-8">
        {/* Left column */}
        <div className="flex-[3]">
          <FadeIn direction="left">
            <Badge variant="indigo">⚡ AI-FIRST DEVELOPER</Badge>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-black leading-[1.0] tracking-tight">
              Hi, I&apos;m{" "}
              <span className="bg-primary px-1.5">Burhan</span>
              <br />I build for the web.
            </h1>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <p className="mt-5 text-text-secondary text-base md:text-lg leading-relaxed max-w-lg">
              Full-stack developer helping global teams ship faster with
              AI-enhanced workflows.
            </p>
          </FadeIn>

          <FadeIn direction="left" delay={0.25}>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-text-secondary font-medium">
                Available for remote work
              </span>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.3}>
            <div className="mt-7 flex flex-wrap gap-3">
              <BrutalButton href="#projects" variant="primary" shadow="yellow">
                VIEW MY WORK →
              </BrutalButton>
              <BrutalButton href="#contact" variant="secondary" shadow="black">
                LET&apos;S TALK
              </BrutalButton>
            </div>
          </FadeIn>

          <Stagger staggerDelay={0.1} className="mt-7 flex gap-3">
            {[
              { label: "in", href: SOCIAL_LINKS.linkedin },
              { label: "gh", href: SOCIAL_LINKS.github },
              { label: "dev", href: SOCIAL_LINKS.devto },
            ].map((social) => (
              <StaggerItem key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-brutal bg-white shadow-brutal-sm flex items-center justify-center text-sm font-extrabold hover:shadow-brutal transition-shadow"
                >
                  {social.label}
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Right column */}
        <div className="flex-[2] w-full md:w-auto">
          <FadeIn direction="right">
            <div className="relative border-brutal bg-white shadow-brutal-lg w-full max-w-[340px] mx-auto md:mx-0 overflow-visible">
              <div className="relative w-full aspect-square overflow-hidden bg-bg-secondary">
                <Image
                  src="/images/burhanharoon.jpeg"
                  alt="Burhan Haroon"
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="px-5 py-4">
                <p className="text-sm font-black">Burhan Haroon</p>
                <p className="text-xs text-text-muted">
                  Based in Pakistan · Working globally
                </p>
              </div>

              {/* Floating stat badges */}
              <SpringIn delay={0.5} className="absolute top-4 -left-6">
                <div className="bg-primary border-brutal shadow-brutal-sm px-4 py-2.5">
                  <div className="text-2xl font-black">7+</div>
                  <div className="text-[9px] font-bold tracking-wider">YEARS EXP</div>
                </div>
              </SpringIn>

              <SpringIn delay={0.7} className="absolute bottom-16 -right-6">
                <div className="bg-secondary text-white border-brutal shadow-brutal-sm px-4 py-2.5">
                  <div className="text-2xl font-black">10+</div>
                  <div className="text-[9px] font-bold tracking-wider">PROJECTS</div>
                </div>
              </SpringIn>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
