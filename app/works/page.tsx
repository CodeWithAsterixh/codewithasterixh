import { Works as WorksPage } from "@/features/works/components/Works";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Works | Asterixh - Software Engineer & Web Developer",
  description: "Explore the portfolio of Asterixh (Paul Peter). Featuring software engineering and web development projects built with Next.js, React, and TypeScript.",
  keywords: [
    "Web Development Projects",
    "Software Engineering Portfolio",
    "Next.js Applications",
    "React Portfolio",
    "Asterixh Work"
  ],
  openGraph: {
    title: "Projects & Works | Asterixh - Software Engineer & Web Developer",
    description: "Explore the portfolio of Asterixh (Paul Peter). Featuring software engineering and web development projects built with Next.js, React, and TypeScript.",
    url: "/works",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Works | Asterixh - Software Engineer & Web Developer",
    description: "Explore the portfolio of Asterixh (Paul Peter). Featuring software engineering and web development projects built with Next.js, React, and TypeScript.",
  }
};

export default function Page() {
  return <WorksPage />;
}
