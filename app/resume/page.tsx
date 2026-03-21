import { ResumeViewer } from "@/features/resume/components/ResumeViewer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Peter Paul - Frontend Developer",
  description: "View and download the professional resume of Peter Paul, a Frontend Developer and Software Engineer.",
  keywords: ["Resume", "Peter Paul", "Frontend Developer", "CV", "Software Engineer"],
  openGraph: {
    title: "Resume | Peter Paul - Frontend Developer",
    description: "View and download the professional resume of Peter Paul, a Frontend Developer and Software Engineer.",
    url: "/resume",
    type: "website",
  },
};

export default function Page() {
  return <ResumeViewer />;
}
