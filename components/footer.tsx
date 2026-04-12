import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-text-muted border-t-[2.5px] border-[#333] px-6 py-5">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="text-xs">
          <span className="font-black text-[#888]">BH<span className="text-secondary">.</span></span>
          <span className="ml-3">© {new Date().getFullYear()} Burhan Haroon. Built with Next.js & Sanity.</span>
        </div>
        <div className="flex gap-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-[11px] font-bold text-[#666] hover:text-[#999] transition-colors">{link.label}</Link>
          ))}
          <Link href="#contact" className="text-[11px] font-bold text-primary hover:text-primary/80 transition-colors">CONTACT</Link>
        </div>
      </div>
    </footer>
  );
}
