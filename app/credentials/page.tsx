import { Credentials as CredentialsPage } from "@/features/credentials/components/Credentials";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Credentials & Core Technical Skills | Asterixh",
  description: "View the technical arsenal of Paul Peter (Asterixh). Expert software engineering skills in Next.js, React, Node.js, and complex system architecture.",
  keywords: [
    "Software Engineer Credentials",
    "Technical Skills Portfolio",
    "Next.js Developer Stack",
    "React Architect Skills",
    "Backend Engineering Proficiency",
    "Cloud Infrastructure Knowledge",
    "Asterixh Skills"
  ],
  openGraph: {
    title: "Credentials & Core Technical Skills | Asterixh",
    description: "Deep dive into the technical expertise and stack of software engineer Paul Peter.",
    url: "/credentials",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credentials & Core Technical Skills | Asterixh",
    description: "Expert software engineering skills in Next.js, React, and Node.js.",
  }
};

export default function Page() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Credentials", item: "/credentials" },
  ];

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} />
      <CredentialsPage />
    </>
  );
}
