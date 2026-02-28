import { Home as HomePage } from "@/features/home/components/Home";
import { Metadata } from "next";
import metaData from "@/data/meta.json";

export const metadata: Metadata = {
  title: "Asterixh | Software Engineer & Web Developer",
  description: "Asterixh (Paul Peter) is a Software Engineer and Web Developer specializing in Next.js, React, TypeScript, and functional software solutions.",
  keywords: [
    ...metaData.site.keywords,
    "Hire Software Engineer",
    "Hire Web Developer",
    "Software Solutions",
    "Next.js Developer",
    "Portfolio"
  ],
  alternates: {
    canonical: metaData.site.url,
  },
  openGraph: {
    title: "Asterixh | Software Engineer & Web Developer",
    description: "Asterixh (Paul Peter) is a Software Engineer and Web Developer specializing in Next.js, React, TypeScript, and functional software solutions.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asterixh | Software Engineer & Web Developer",
    description: "Asterixh (Paul Peter) is a Software Engineer and Web Developer specializing in Next.js, React, TypeScript, and functional software solutions.",
  }
};

export default function Page() {
  return <HomePage />;
}
