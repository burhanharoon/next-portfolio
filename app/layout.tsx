import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Burhan Haroon — AI-First Full-Stack Developer",
  description:
    "Full-stack developer with 7+ years of experience. I use AI to ship faster, think bigger, and build smarter. Available for remote work worldwide.",
  openGraph: {
    title: "Burhan Haroon — AI-First Full-Stack Developer",
    description:
      "Full-stack developer helping global teams ship faster with AI-enhanced workflows.",
    url: "https://burhanharoon.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main className="pt-[73px]">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
