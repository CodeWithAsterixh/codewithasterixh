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
        main="Meet Asterixh"
        sub="Exploring technology, innovation, and impactful solutions."
        cta={{ navto: "/contact", text: "Get in Touch" }}
        extra1={
          <span className="w-full h-fit text-lg min-[498px]:text-xl sm:text-2xl flex items-center justify-center gap-2 font-mono">
            Core Values:
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
