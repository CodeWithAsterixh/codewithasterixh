import { About as AboutPage } from "@/features/about/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Asterixh - Full Stack Developer",
  description: "Learn more about Asterixh (Paul Peter), a Full Stack Developer with expertise in React, Next.js, and TypeScript. Discover my journey, experience, and education.",
  keywords: [
    "About Asterixh",
    "Paul Peter Bio",
    "Full Stack Developer Experience",
    "Software Engineer Education",
    "React Developer Background"
  ],
  openGraph: {
    title: "About Me | Asterixh - Full Stack Developer",
    description: "Learn more about Asterixh (Paul Peter), a Full Stack Developer with expertise in React, Next.js, and TypeScript. Discover my journey, experience, and education.",
    url: "/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me | Asterixh - Full Stack Developer",
    description: "Learn more about Asterixh (Paul Peter), a Full Stack Developer with expertise in React, Next.js, and TypeScript.",
  }
};

export default function Page() {
  return <AboutPage />;
}
