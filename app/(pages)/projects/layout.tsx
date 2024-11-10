import HeroSection from "@/ui/components/Hero/Hero";
import Typewriter from "@/ui/components/TextWriteMock/TextWriterMock";
import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function ProjectsLayout({ children }: Props) {
  return (
    <div className="size-full">
      <HeroSection
        main="Showcasing My Work"
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
