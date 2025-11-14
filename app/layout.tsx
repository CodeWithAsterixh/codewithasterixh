import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paul Peter | Full-Stack Web Developer",
  description:
    "Paul Peter is an innovative full-stack web developer creating high-performance websites, dashboards, and apps that help businesses grow. Explore his portfolio of modern web projects.",
  keywords: [
    "Paul Peter",
    "Full-Stack Developer",
    "Web Developer Lagos",
    "Next.js Developer",
    "Tailwind CSS",
    "Portfolio Website",
    "React Developer",
    "UI/UX Designer",
    "Shadcn/UI",
    "SaaS Dashboard",
    "E-commerce Development",
    "SEO Optimization",
  ],
  authors: [
    {
      name: "Paul Peter",
      url: "https://codewithasterixh.vercel.app",
    },
  ],
  creator: "Paul Peter",
  publisher: "Paul Peter",
  metadataBase: new URL("https://codewithasterixh.vercel.app"),
  openGraph: {
    title: "Paul Peter | Full-Stack Web Developer",
    description:
      "Crafting high-performance websites, dashboards, and apps. Explore Paul Peter's portfolio and projects showcasing innovative web solutions.",
    url: "https://codewithasterixh.vercel.app",
    siteName: "Code With Asterixh",
    type: "website",
    images: [
      {
        url: "https://codewithasterixh.vercel.app/og-image.png", // replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Paul Peter Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Peter | Full-Stack Web Developer",
    description:
      "Explore Paul Peter's portfolio of modern web projects, dashboards, and apps designed to deliver results.",
    creator: "@paul_peter",
    images: ["https://codewithasterixh.vercel.app/og-image.png"], // same OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: "#0f1724",
  alternates: {
    canonical: "https://codewithasterixh.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-poppins bg-base-100 text-base-content">
        {children}
      </body>
    </html>
  );
}
