import type { Metadata } from "next";
import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";
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

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(metaData.site.url),
  title: {
    default: metaData.site.title,
    template: `%s | ${metaData.site.author}`,
  },
  description: metaData.site.description,
  applicationName: "Asterixh Portfolio",
  authors: [{ name: metaData.site.author, url: metaData.site.url }],
  creator: `${metaData.site.author} (${metaData.site.alias})`,
  publisher: metaData.site.author,
  category: "technology",
  classification: "Software Engineering Portfolio",
  keywords: metaData.site.keywords,
  alternates: {
    canonical: metaData.site.url,
  },
  openGraph: {
    title: metaData.site.title,
    description: metaData.site.description,
    url: metaData.site.url,
    siteName: `${metaData.site.author} (${metaData.site.alias})`,
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Paul Peter (Asterixh) - Fullstack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.site.title,
    description: metaData.site.description,
    creator: "@paul_peter",
    site: "@paul_peter",
    images: ["/opengraph-image"],
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
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
  other: {
    thumbnail: `${metaData.site.url}/icon`,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} antialiased bg-background text-white`}
      >
        <JsonLd />
        <main id="scroll-container" className="relative isolate overflow-hidden h-dvh w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
