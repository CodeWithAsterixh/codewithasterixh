import { Services as ServicesPage } from "@/features/services/components/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Asterixh - Full Stack Developer",
  description: "Web development services offered by Asterixh (Paul Peter). Including frontend development, backend API design, full stack applications, and performance optimization.",
  keywords: [
    "Web Development Services",
    "Frontend Development",
    "Backend API Design",
    "Performance Optimization",
    "React Development Services"
  ],
  openGraph: {
    title: "Services | Asterixh - Full Stack Developer",
    description: "Web development services offered by Asterixh (Paul Peter). Including frontend development, backend API design, and full stack applications.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Asterixh - Full Stack Developer",
    description: "Web development services offered by Asterixh (Paul Peter). Including frontend development, backend API design, and full stack applications.",
  }
};

export default function Page() {
  return <ServicesPage />;
}
