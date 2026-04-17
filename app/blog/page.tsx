import { Blog as BlogPage } from "@/features/blog/components/Blog";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Software Engineering Blog & Web Insights | Asterixh",
  description: "Read the latest insights on React, Next.js, and Backend Engineering. Technical tutorials and architectural deep-dives by Paul Peter (Asterixh).",
  keywords: [
    "Web Development Blog",
    "React Tutorials",
    "Next.js Tips",
    "Coding Insights",
    "Software Architecture Blog",
    "Technical Writing Portfolio",
    "TypeScript Deep Dives"
  ],
  openGraph: {
    title: "Software Engineering Blog & Web Insights | Asterixh",
    description: "Technical tutorials and architectural deep-dives on modern web development.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineering Blog & Web Insights | Asterixh",
    description: "Insights on React, Next.js, and Backend Engineering by Paul Peter.",
  }
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams?.q;
  const query = typeof q === "string" ? q : undefined;

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
  ];

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} />
      <BlogPage query={query} />
    </>
  );
}
