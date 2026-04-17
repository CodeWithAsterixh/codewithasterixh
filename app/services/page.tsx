import { Services as ServicesPage } from "@/features/services/components/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development & Software Engineering Services | Asterixh",
  description: "Professional software engineering services: Custom web applications, API design, backend architecture, and high-performance Next.js development.",
  keywords: [
    "Software Engineering Services",
    "Web Development Services",
    "API Design & Integration",
    "Tailored Web Systems",
    "Next.js Development",
    "Scalable Backend Architecture",
    "Software Solutions Specialist"
  ],
  openGraph: {
    title: "Web Development & Software Engineering Services | Asterixh",
    description: "High-performance software engineering and custom web development services.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development & Software Engineering Services | Asterixh",
    description: "Expert software engineering and custom web development solutions.",
  }
};

export default function Page() {
  return <ServicesPage />;
}
