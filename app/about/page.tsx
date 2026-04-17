import { About as AboutPage } from "@/features/about/components/About";
import metaData from "@/data/meta.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Paul Peter | Lead Software Engineer & Web Architect",
  description: "Discover the philosophy of Paul Peter (Asterixh), a Fullstack Software Engineer focused on engineering resilient, production-ready web platforms.",
  keywords: [
    "About Paul Peter",
    "Asterixh Bio",
    "Lead Software Engineer",
    "Web Architect",
    "Fullstack Systems Engineering",
    "Production Ready Software",
    "Next.js Architect"
  ],
  openGraph: {
    title: "About Paul Peter | Lead Software Engineer & Web Architect",
    description: "Fullstack Software Engineer focused on engineering resilient, production-ready web platforms.",
    url: "/about",
    type: "profile",
    images: [{ url: "/images/og-images/og-about.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Paul Peter | Lead Software Engineer & Web Architect",
    description: "Discover the engineering philosophy behind scalable web systems.",
    images: ["/images/og-images/og-about.png"],
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Paul Peter",
      alternateName: "Asterixh",
      description: "Fullstack Software Engineer focused on scalable web systems",
      url: metaData.site.url,
      sameAs: [
        "https://linkedin.com/in/paul-peter-eyinnaya",
        "https://github.com/CodeWithAsterixh"
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPage />
    </>
  );
}
