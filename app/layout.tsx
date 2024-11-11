import { ReduxProvider } from "@/store/provider";
import { ModalProvider } from "@/ui/components/Modal/Modal";
import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Paul Peter - Front-End Developer | CodeWithAsterixh",
  description:
    "Paul Peter's portfolio showcasing his expertise in front-end development with Next.js, TypeScript, React, Material UI, Tailwind CSS, and more. Explore his projects and skills.",
  keywords:
    "Paul Peter, CodeWithAsterixh, Front-End Developer, Web Developer, Next.js, TypeScript, React Developer, Material UI, Tailwind CSS, JavaScript, Web Design, UI/UX Developer, Portfolio",
  openGraph: {
    title: "Paul Peter - Front-End Developer | CodeWithAsterixh",
    description:
      "Explore the portfolio of Paul Peter, a passionate front-end developer specializing in creating high-performance web experiences with Next.js, TypeScript, React, Material UI, and Tailwind CSS.",
    url: "https://codewithasterixh.vercel.app",
    images: "https://codewithasterixh.vercel.app/images/myImage2.jpg",
    type: "website",
    siteName: "CodeWithAsterixh",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Peter - Front-End Developer | CodeWithAsterixh",
    description:
      "Discover the work of Paul Peter, a front-end developer skilled in Next.js, TypeScript, React, Material UI, and Tailwind CSS, dedicated to creating impactful digital experiences.",
    images: "https://codewithasterixh.vercel.app/images/myImage2.jpg",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: "index, follow", // Optional, customize according to your SEO needs
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-screen h-screen relative antialiased`}
      >
        <ReduxProvider>
          <ModalProvider>{children}</ModalProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
