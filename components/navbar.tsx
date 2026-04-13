"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, LOGO_LINK } from "@/lib/constants";
import { BrutalButton } from "@/components/ui/brutal-button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-bg-primary border-b-[2.5px] border-border transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href={LOGO_LINK} className="text-xl font-black">
          BH<span className="text-secondary">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.filter((link) => link.label !== "CONTACT").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-bold text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <BrutalButton href={NAV_LINKS.find((l) => l.label === "CONTACT")!.href} variant="secondary" shadow="black">
            CONTACT
          </BrutalButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-text-primary transition-transform ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-primary transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-primary transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t-[2.5px] border-border bg-bg-primary px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.filter((link) => link.label !== "CONTACT").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <BrutalButton
            href={NAV_LINKS.find((l) => l.label === "CONTACT")!.href}
            variant="secondary"
            shadow="black"
            className="w-fit"
          >
            CONTACT
          </BrutalButton>
        </div>
      )}
    </nav>
  );
}
