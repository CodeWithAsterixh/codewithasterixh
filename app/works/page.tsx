import { Works as WorksPage } from "@/features/works/components/Works";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Works | Asterixh - Full Stack Developer",
  description: "Explore the portfolio of Asterixh (Paul Peter). Featuring projects built with Next.js, React, TypeScript, and modern web technologies. View case studies and code.",
  keywords: [
    "Web Development Projects",
    "React Portfolio",
    "Next.js Applications",
    "Full Stack Case Studies",
    "Asterixh Work"
  ],
  openGraph: {
    title: "Projects & Works | Asterixh - Full Stack Developer",
    description: "Explore the portfolio of Asterixh (Paul Peter). Featuring projects built with Next.js, React, TypeScript, and modern web technologies.",
    url: "/works",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Works | Asterixh - Full Stack Developer",
    description: "Explore the portfolio of Asterixh (Paul Peter). Featuring projects built with Next.js, React, TypeScript, and modern web technologies.",
  }
};

export default function Page() {
  return <WorksPage />;
}
