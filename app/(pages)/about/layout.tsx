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
