import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Burhan Haroon — AI-First Full-Stack Developer",
  description:
    "Full-stack developer with 7+ years of experience. I use AI to ship faster, think bigger, and build smarter. Available for remote work worldwide.",
  openGraph: {
    title: "Burhan Haroon — AI-First Full-Stack Developer",
    description:
      "Full-stack developer helping global teams ship faster with AI-enhanced workflows.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Burhan Haroon — AI-First Full-Stack Developer",
    description:
      "Full-stack developer helping global teams ship faster with AI-enhanced workflows.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <Navbar />
        <main className="pt-[73px]">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
