import { About as AboutPage } from "@/features/about/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Asterixh - Software Engineer & Web Developer",
  description: "Learn more about Asterixh (Paul Peter), a Software Engineer and Web Developer with expertise in React, Next.js, and TypeScript.",
  keywords: [
    "About Asterixh",
    "Paul Peter Bio",
    "Software Engineer Experience",
    "Web Developer Education",
    "React Developer Background"
  ],
  openGraph: {
    title: "About Me | Asterixh - Software Engineer & Web Developer",
    description: "Learn more about Asterixh (Paul Peter), a Software Engineer and Web Developer with expertise in React, Next.js, and TypeScript.",
    url: "/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me | Asterixh - Software Engineer & Web Developer",
    description: "Learn more about Asterixh (Paul Peter), a Software Engineer and Web Developer with expertise in React, Next.js, and TypeScript.",
  }
};

export default function Page() {
  return <AboutPage />;
}
