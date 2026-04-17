import { Home as HomePage } from "@/features/home/components/Home";
import { Metadata } from "next";
import metaData from "@/data/meta.json";

export const metadata: Metadata = {
  title: "Asterixh | Expert Software Engineer & Fullstack Web Developer",
  description: "Asterixh (Paul Peter) is a Software Engineer specializing in Next.js, React, and Node.js. Building scalable, high-performance web systems that convert.",
  keywords: [
    "Expert Software Engineer",
    "Fullstack Web Developer",
    "Next.js Specialist",
    "React Architecture",
    "Backend Systems",
    "Scalable Web Applications",
    ...metaData.site.keywords,
  ],
  alternates: {
    canonical: metaData.site.url,
  },
  openGraph: {
    title: "Asterixh | Expert Software Engineer & Fullstack Web Developer",
    description: "Building scalable, high-performance web systems that convert with Next.js, React, and Node.js.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asterixh | Software Engineer & Web Developer",
    description: "Expert software engineering solutions focused on scalability and conversion.",
  }
};

export default function Page() {
  return <HomePage />;
}
