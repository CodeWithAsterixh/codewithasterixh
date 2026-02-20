import { Credentials as CredentialsPage } from "@/features/credentials/components/Credentials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credentials & Skills | Asterixh - Full Stack Developer",
  description: "View the credentials, skills, and certifications of Asterixh (Paul Peter). Expert in JavaScript, TypeScript, React, Next.js, and Node.js.",
  keywords: [
    "Developer Skills",
    "React Certification",
    "JavaScript Expert",
    "TypeScript Proficiency",
    "Full Stack Credentials"
  ],
  openGraph: {
    title: "Credentials & Skills | Asterixh - Full Stack Developer",
    description: "View the credentials, skills, and certifications of Asterixh (Paul Peter). Expert in JavaScript, TypeScript, React, Next.js, and Node.js.",
    url: "/credentials",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credentials & Skills | Asterixh - Full Stack Developer",
    description: "View the credentials, skills, and certifications of Asterixh (Paul Peter). Expert in JavaScript, TypeScript, React, Next.js, and Node.js.",
  }
};

export default function Page() {
  return <CredentialsPage />;
}
