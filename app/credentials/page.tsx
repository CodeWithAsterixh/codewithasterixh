import { Credentials as CredentialsPage } from "@/features/credentials/components/Credentials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credentials & Skills | Asterixh - Software Engineer & Web Developer",
  description: "View the credentials, skills, and certifications of Asterixh (Paul Peter). Expert in software engineering and web development with React, Next.js, and TypeScript.",
  keywords: [
    "Software Engineer Skills",
    "Web Developer Credentials",
    "React Expert",
    "TypeScript Proficiency",
    "Engineering Certifications"
  ],
  openGraph: {
    title: "Credentials & Skills | Asterixh - Software Engineer & Web Developer",
    description: "View the credentials, skills, and certifications of Asterixh (Paul Peter). Expert in software engineering and web development with React, Next.js, and TypeScript.",
    url: "/credentials",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credentials & Skills | Asterixh - Software Engineer & Web Developer",
    description: "View the credentials, skills, and certifications of Asterixh (Paul Peter). Expert in software engineering and web development with React, Next.js, and TypeScript.",
  }
};

export default function Page() {
  return <CredentialsPage />;
}
