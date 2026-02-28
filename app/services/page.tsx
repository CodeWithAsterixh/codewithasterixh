import { Services as ServicesPage } from "@/features/services/components/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Asterixh - Software Engineer & Web Developer",
  description: "Software engineering and web development services offered by Asterixh (Paul Peter). Including system architecture, API design, and responsive web applications.",
  keywords: [
    "Software Engineering Services",
    "Web Development Services",
    "System Architecture",
    "API Design",
    "React Development Services"
  ],
  openGraph: {
    title: "Services | Asterixh - Software Engineer & Web Developer",
    description: "Software engineering and web development services offered by Asterixh (Paul Peter). Including system architecture, API design, and responsive web applications.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Asterixh - Software Engineer & Web Developer",
    description: "Software engineering and web development services offered by Asterixh (Paul Peter). Including system architecture, API design, and responsive web applications.",
  }
};

export default function Page() {
  return <ServicesPage />;
}
