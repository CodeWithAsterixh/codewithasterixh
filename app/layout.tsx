import { Footer } from "@/components/ui/organisms/Footer/Footer";
import { Navbar } from "@/components/ui/organisms/Navbar/Navbar";
import { PageTransitionOverlay } from "@/components/ui/transitions/PageTransitionOverlay";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import metaData from "@/data/meta.json";
import { JsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(metaData.site.url),
  title: {
    default: "Asterixh | Software Engineer & Web Developer",
    template: `%s | ${metaData.site.title}`,
  },
  description: metaData.site.description,
  keywords: [
    "Software Engineer",
    "Website Developer",
    "Fullstack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "System Architecture",
    "API Design",
    "Custom Web Applications",
    "Software Solutions",
    "Lagos Developer",
    "Nigeria Software Engineer",
    ...metaData.site.keywords,
  ],
  alternates: {
    canonical: metaData.site.url,
  },
  openGraph: {
    title: metaData.site.title,
    description: metaData.site.description,
    url: metaData.site.url,
    siteName: "Asterixh",
    type: "website",
    images: [{ url: "/images/og-images/og-home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.site.title,
    description: metaData.site.description,
    images: ["/images/og-images/og-home.png"],
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
  other: {
    "thumbnail": `${metaData.site.url}/icon`,
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-white`}
      >
        <JsonLd />
        <PageTransitionOverlay />

        <main id="scroll-container" className="relative isolate overflow-y-auto h-dvh w-full">
          <Navbar />
          <div className="w-full z-1 isolate">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
