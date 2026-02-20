import { Contact as ContactPage } from "@/features/contact/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me | Asterixh - Full Stack Developer",
  description: "Get in touch with Asterixh (Paul Peter). Available for freelance projects, full-time roles, and collaborations. Let's build something amazing together.",
  keywords: [
    "Contact Asterixh",
    "Hire Developer",
    "Web Development Inquiry",
    "Freelance React Developer",
    "Get a Quote"
  ],
  openGraph: {
    title: "Contact Me | Asterixh - Full Stack Developer",
    description: "Get in touch with Asterixh (Paul Peter). Available for freelance projects, full-time roles, and collaborations.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Me | Asterixh - Full Stack Developer",
    description: "Get in touch with Asterixh (Paul Peter). Available for freelance projects, full-time roles, and collaborations.",
  }
};

export default function Page() {
  return <ContactPage />;
}
