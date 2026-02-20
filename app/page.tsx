import { Home as HomePage } from "@/features/home/components/Home";
import { Metadata } from "next";
import metaData from "@/data/meta.json";

export const metadata: Metadata = {
  title: "Asterixh | Full Stack Developer | Next.js & React Expert",
  description: "Asterixh (Paul Peter) is a Full Stack Developer specializing in Next.js, React, TypeScript, and modern web solutions. View my portfolio, projects, and skills.",
  keywords: [
    ...metaData.site.keywords,
    "Hire React Developer",
    "Next.js Expert",
    "Web Development Services",
    "Portfolio"
  ],
  alternates: {
    canonical: metaData.site.url,
  },
  openGraph: {
    title: "Asterixh | Full Stack Developer | Next.js & React Expert",
    description: "Asterixh (Paul Peter) is a Full Stack Developer specializing in Next.js, React, TypeScript, and modern web solutions. View my portfolio, projects, and skills.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asterixh | Full Stack Developer | Next.js & React Expert",
    description: "Asterixh (Paul Peter) is a Full Stack Developer specializing in Next.js, React, TypeScript, and modern web solutions.",
  }
};

export default function Page() {
  return <HomePage />;
}
