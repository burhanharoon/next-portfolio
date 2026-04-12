"use client";

import type { ReactNode } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion-wrapper";

interface AboutAnimationsProps {
  headline: string;
  stats: { value: string; label: string }[];
  children: ReactNode;
}

const shadowVariants = ["shadow-brutal", "shadow-brutal-indigo", "shadow-brutal-yellow", "shadow-brutal"];

export function AboutAnimations({ headline, stats, children }: AboutAnimationsProps) {
  return (
    <div className="flex-1">
      <FadeIn direction="up">
        <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
          {headline.split("AI as a superpower").map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className="bg-primary px-1">AI as a superpower</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </h2>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <div className="mt-4">{children}</div>
      </FadeIn>

      <Stagger staggerDelay={0.1} className="mt-6 flex flex-wrap gap-3">
        {stats.map((stat, i) => (
          <StaggerItem key={stat.label}>
            <div className={`bg-white border-brutal px-5 py-3.5 text-center ${shadowVariants[i % shadowVariants.length]}`}>
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-[9px] font-bold text-text-muted tracking-wider">{stat.label}</div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
