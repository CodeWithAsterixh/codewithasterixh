import { ResumeViewer } from "@/features/resume/components/ResumeViewer";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import metaData from "@/data/meta.json";

export const metadata: Metadata = {
  title: "Resume & Engineering Experience | Paul Peter (Asterixh)",
  description: "Inspect the resume and technical background of Paul Peter (Asterixh), a Fullstack Software Engineer with 4+ years building Next.js, React, and Node.js systems.",
  keywords: [
    "Paul Peter Resume",
    "Asterixh CV",
    "Fullstack Engineer Resume",
    "Next.js Developer CV",
    "React Developer Resume",
    "TypeScript Engineer Resume",
    "Software Engineer Career History",
    "Hire Fullstack Developer",
  ],
  alternates: {
    canonical: `${metaData.site.url}/resume`,
  },
  openGraph: {
    title: "Resume & Engineering Experience | Paul Peter (Asterixh)",
    description: "Inspect the resume and technical background of Paul Peter (Asterixh), a Fullstack Software Engineer with 4+ years building Next.js, React, and Node.js systems.",
    url: `${metaData.site.url}/resume`,
    type: "profile",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Paul Peter (Asterixh) - Resume & Engineering Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume & Engineering Experience | Paul Peter (Asterixh)",
    description: "Inspect the resume and technical background of Paul Peter (Asterixh), a Fullstack Software Engineer with 4+ years building Next.js, React, and Node.js systems.",
    creator: "@paul_peter",
    images: ["/opengraph-image"],
  },
};

export default function Page() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Resume", item: "/resume" },
  ];

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} />
      <ResumeViewer />
    </>
  );
}
