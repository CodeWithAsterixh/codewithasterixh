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
        main="Welcome to Our Creative Space"
        sub="Explore projects, blogs, and more."
        cta={{ navto: "#", text: "Get in touch" }}
        extra1={
          <span className="w-full h-fit text-lg min-[498px]:text-xl sm:text-2xl flex items-center justify-center gap-2 font-mono">
            We are:
            <Typewriter
              spanClassName="!border-cyan-400"
              className="!text-cyan-300"
              texts={["Innovative", "Intuitive", "Creative"]}
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
            Bridging creativity and technology,{" "}
            <span className="text-neutral-300 dark:text-neutral-400">
              CodeWithAsterixh
            </span>{" "}
            delivers high-performance, user-centered solutions that elevate
            digital experiences. From building robust interfaces to refining
            complex systems, I’m committed to impactful, seamless, and
            innovative development that drives results.
          </p>
        }
      />
      {children}
    </div>
  );
}

export default ProjectsLayout;
