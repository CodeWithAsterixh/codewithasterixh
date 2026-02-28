import { Contact as ContactPage } from "@/features/contact/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me | Asterixh - Software Engineer & Web Developer",
  description: "Get in touch with Asterixh (Paul Peter). Available for software engineering projects, web development, and collaborations.",
  keywords: [
    "Contact Asterixh",
    "Hire Software Engineer",
    "Hire Web Developer",
    "Web Development Inquiry",
    "Get a Quote"
  ],
  openGraph: {
    title: "Contact Me | Asterixh - Software Engineer & Web Developer",
    description: "Get in touch with Asterixh (Paul Peter). Available for software engineering projects, web development, and collaborations.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Me | Asterixh - Software Engineer & Web Developer",
    description: "Get in touch with Asterixh (Paul Peter). Available for software engineering projects, web development, and collaborations.",
  }
};

export default function Page() {
  return <ContactPage />;
}
