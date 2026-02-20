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
  title: metaData.site.title,
  description: metaData.site.description,
  keywords: metaData.site.keywords,
  openGraph: {
    title: metaData.site.title,
    description: metaData.site.description,
    url: metaData.site.url,
    siteName: metaData.site.logo,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.site.title,
    description: metaData.site.description,
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
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
