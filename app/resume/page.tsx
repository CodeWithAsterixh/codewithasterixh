import { ResumeViewer } from "@/features/resume/components/ResumeViewer";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Professional Resume & Career History | Paul Peter",
  description: "Download and view the professional resume of Paul Peter (Asterixh), a Fullstack Software Engineer with 4+ years of experience in React and Node.js.",
  keywords: ["Software Engineer Resume", "Paul Peter CV", "Asterixh Career History", "Fullstack Developer Resume", "Hire Paul Peter"],
  openGraph: {
    title: "Professional Resume & Career History | Paul Peter",
    description: "Fullstack Software Engineer Resume - 4+ years of experience in scalable web systems.",
    url: "/resume",
    type: "profile",
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
