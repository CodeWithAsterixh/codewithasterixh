import { Blog as BlogPage } from "@/features/blog/components/Blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Asterixh - Insights on Web Development",
  description: "Read the latest articles and tutorials on web development, React, Next.js, and TypeScript from Asterixh (Paul Peter).",
  keywords: [
    "Web Development Blog",
    "React Tutorials",
    "Next.js Tips",
    "Coding Insights",
    "Tech Blog"
  ],
  openGraph: {
    title: "Blog | Asterixh - Insights on Web Development",
    description: "Read the latest articles and tutorials on web development, React, Next.js, and TypeScript from Asterixh (Paul Peter).",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Asterixh - Insights on Web Development",
    description: "Read the latest articles and tutorials on web development, React, Next.js, and TypeScript from Asterixh (Paul Peter).",
  }
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams?.q;
  const query = typeof q === "string" ? q : undefined;
  return <BlogPage query={query} />;
}
