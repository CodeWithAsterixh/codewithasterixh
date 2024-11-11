import HeroSection from "@/ui/components/Hero/Hero";
import Typewriter from "@/ui/components/TextWriteMock/TextWriterMock";
import clsx from "clsx";
import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "About Paul Peter | Front-End Developer | CodeWithAsterixh",
  description:
    "Learn more about Paul Peter, a passionate front-end developer with expertise in Next.js, TypeScript, React, and modern web technologies. Explore his background and journey in the world of coding.",
  keywords:
    "Paul Peter, About, Front-End Developer, Web Developer, Next.js, TypeScript, React, Web Design, UI/UX Developer, Coding Journey",
  openGraph: {
    title: "About Paul Peter | Front-End Developer | CodeWithAsterixh",
    description:
      "Learn more about Paul Peter, a passionate front-end developer with expertise in Next.js, TypeScript, React, and modern web technologies. Explore his background and journey in the world of coding.",
    images: [
      {
        url: "https://codewithasterixh.vercel.app/images/myImage2.jpg", // Replace with your actual portfolio image
        width: 800,
        height: 600,
      },
    ],
    url: "https://codewithasterixh.vercel.app/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Paul Peter | Front-End Developer | CodeWithAsterixh",
    description:
      "Learn more about Paul Peter, a passionate front-end developer with expertise in Next.js, TypeScript, React, and modern web technologies. Explore his background and journey in the world of coding.",
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
        main="Discover the World of Asterixh"
        sub="Dive into projects, insights, and creativity."
        cta={{ navto: "#contact", text: "Connect with Me" }}
        extra1={
          <span className="w-full h-fit text-lg min-[498px]:text-xl sm:text-2xl flex items-center justify-center gap-2 font-mono">
            My Focus:
            <Typewriter
              spanClassName="!border-purple-400"
              className="!text-purple-300"
              texts={[
                "Innovative Solutions",
                "Seamless Experiences",
                "Cutting-Edge Tech",
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
            Blending creativity and technology,{" "}
            <span className="text-neutral-300 dark:text-neutral-400">
              CodeWithAsterixh
            </span>{" "}
            delivers intuitive, high-performance solutions that transform
            digital experiences. From crafting interactive UIs to refining
            complex systems, I&apos;m dedicated to seamless, innovative
            development that makes an impact.
          </p>
        }
      />

      {children}
    </div>
  );
}

export default ProjectsLayout;
