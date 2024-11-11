import HeroSection from "@/ui/components/Hero/Hero";
import Typewriter from "@/ui/components/TextWriteMock/TextWriterMock";
import clsx from "clsx";
import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export const metadata: Metadata = {
  title:
    "Projects by Paul Peter | Front-End Developer | CodeWithAsterixh | years of practical exp | project",
  description:
    "Explore the projects of Paul Peter, a front-end developer who builds high-performance web experiences using Next.js, TypeScript, React, and Tailwind CSS. Check out his latest work.",
  keywords:
    "Paul Peter, Projects, Front-End Developer, Web Developer, Portfolio, Next.js, TypeScript, React, Web Design",
  openGraph: {
    title: "Projects by Paul Peter | Front-End Developer | CodeWithAsterixh",
    description:
      "Explore the projects of Paul Peter, a front-end developer who builds high-performance web experiences using Next.js, TypeScript, React, and Tailwind CSS. Check out his latest work.",
    images: [
      {
        url: "https://codewithasterixh.vercel.app/images/myImage2.jpg", // Replace with the actual image URL
        width: 800,
        height: 600,
      },
    ],
    url: "https://codewithasterixh.vercel.app/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects by Paul Peter | Front-End Developer | CodeWithAsterixh",
    description:
      "Explore the projects of Paul Peter, a front-end developer who builds high-performance web experiences using Next.js, TypeScript, React, and Tailwind CSS. Check out his latest work.",
    images: [
      {
        url: "https://codewithasterixh.vercel.app/images/myImage2.jpg", // Replace with the actual image URL
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
        main="Project | Showcasing My Works"
        sub="Explore a selection of projects built with passion and precision."
        cta={{ navto: "#portfolio", text: "View My Projects" }}
        extra1={
          <span className="w-full h-fit text-lg min-[498px]:text-xl sm:text-2xl flex items-center justify-center gap-2 font-mono">
            Project Highlights:
            <Typewriter
              spanClassName="!border-indigo-400"
              className="!text-indigo-300"
              texts={[
                "Innovative Designs",
                "Optimized Performance",
                "Scalable Solutions",
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
            , each project embodies a blend of creativity and technical
            expertise. From interactive UIs to performance-driven solutions,
            these projects reflect my commitment to delivering impactful,
            high-quality work that drives results.
          </p>
        }
      />

      {children}
    </div>
  );
}

export default ProjectsLayout;
