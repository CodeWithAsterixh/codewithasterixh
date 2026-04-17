import { Works as WorksPage } from "@/features/works/components/Works";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Fullstack Portfolio: Selected Works & Systems | Asterixh",
  description: "Explore a collection of scalable web systems, APIs, and interactive platforms built with Next.js, React, and Node.js by focus-driven software engineer.",
  keywords: [
    "Software Portfolio",
    "Fullstack Projects",
    "Next.js Systems",
    "React Applications",
    "Node.js Backend Projects",
    "API Development Showcase",
    "Web Architecture Examples"
  ],
  openGraph: {
    title: "Fullstack Portfolio: Selected Works & Systems | Asterixh",
    description: "Explore a collection of scalable web systems and interactive platforms built with modern technologies.",
    url: "/works",
    type: "website",
    images: [{ url: "/images/og-images/og-works.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullstack Portfolio: Selected Works & Systems | Asterixh",
    description: "Scalable web systems and interactive platforms built with Next.js and Node.js.",
    images: ["/images/og-images/og-works.png"],
  }
};

export default function Page() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Works", item: "/works" },
  ];

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} />
      <WorksPage />
    </>
  );
}
