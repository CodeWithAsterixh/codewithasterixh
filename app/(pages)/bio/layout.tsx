import HeroSection from "@/ui/components/Hero/Hero";
import Typewriter from "@/ui/components/TextWriteMock/TextWriterMock";
import clsx from "clsx";
import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Bio of Paul Peter | Front-End Developer | CodeWithAsterixh",
  description:
    "Discover the biography of Paul Peter, a front-end developer specializing in Next.js, TypeScript, React, Material UI, and Tailwind CSS. Understand his journey in web development.",
  keywords:
    "Paul Peter, Biography, Front-End Developer, Web Developer, Bio, Next.js, TypeScript, React, Material UI, Tailwind CSS",
  openGraph: {
    title: "Bio of Paul Peter | Front-End Developer | CodeWithAsterixh",
    description:
      "Discover the biography of Paul Peter, a front-end developer specializing in Next.js, TypeScript, React, Material UI, and Tailwind CSS. Understand his journey in web development.",
    images: [
      {
        url: "https://codewithasterixh.vercel.app/images/myImage2.jpg", // Replace with your actual portfolio image
        width: 800,
        height: 600,
      },
    ],
    url: "https://codewithasterixh.vercel.app/bio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bio of Paul Peter | Front-End Developer | CodeWithAsterixh",
    description:
      "Discover the biography of Paul Peter, a front-end developer specializing in Next.js, TypeScript, React, Material UI, and Tailwind CSS. Understand his journey in web development.",
    images: [
      {
        url: "https://codewithasterixh.vercel.app/images/myImage2.jpg", // Replace with your actual portfolio image
        width: 800,
        height: 600,
      },
    ],
  },
};

function ProjectsLayout({ children }: Props) {
  return (
    <div className="size-full">
      <HeroSection
        main="Meet Asterixh"
        sub="Exploring technology, innovation, and impactful solutions."
        cta={{ navto: "/contact", text: "Get in Touch" }}
        extra1={
          <span className="w-full h-fit flex-col text-lg min-[498px]:text-xl sm:text-2xl flex items-center justify-center gap-2 font-mono">
            <strong>Core Values:</strong>
            <Typewriter
              spanClassName="!border-teal-600 dark:!border-teal-400"
              className="!text-teal-700 dark:!text-teal-300"
              texts={[
                "Creativity in Tech",
                "Precision Engineering",
                "User-Centric Solutions",
              ]}
            />
          </span>
        }
        extra2={
          <p
            className={clsx(
              "font-mono relative pt-5 text-base min-[498px]:text-lg sm:text-xl px-5 w-full max-w-screen-md",
              "before:content-[''] before:absolute before:w-24 before:h-1 before:rounded-full before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-neutral-200 dark:before:bg-neutral-400"
            )}
          >
            At{" "}
            <span className="text-neutral-300 dark:text-neutral-400">
              CodeWithAsterixh
            </span>
            , I combine innovation and technical expertise to bring ideas to
            life. Focused on creating intuitive interfaces and dynamic
            experiences, I’m passionate about transforming digital landscapes
            through thoughtful, impactful development.
          </p>
        }
      />
      {children}
    </div>
  );
}

export default ProjectsLayout;
