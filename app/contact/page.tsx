import { Contact as ContactPage } from "@/features/contact/components/Contact";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Paul Peter | Hire Expert Software Engineer & Developer",
  description: "Ready to fix your architectural bottlenecks or build a scalable MVP? Get in touch with Paul Peter for expert software engineering solutions.",
  keywords: [
    "Contact Paul Peter",
    "Hire Software Engineer",
    "Hire Web Developer",
    "Freelance Software Engineer",
    "Consult Web Developer",
    "System Architecture Consulting"
  ],
  openGraph: {
    title: "Contact Paul Peter | Hire Expert Software Engineer & Developer",
    description: "Get in touch with Paul Peter for professional software engineering and web development solutions.",
    url: "/contact",
    type: "website",
    images: [{ url: "/images/og-images/og-contact.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Paul Peter | Hire Expert Software Engineer & Developer",
    description: "Ready to build? Get in touch with Paul Peter for expert software engineering solutions.",
    images: ["/images/og-images/og-contact.png"],
  }
};

export default function Page() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Contact", item: "/contact" },
  ];

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} />
      <ContactPage />
    </>
  );
}
