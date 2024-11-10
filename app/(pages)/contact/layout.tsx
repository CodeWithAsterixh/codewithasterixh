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
        main="Let’s Connect"
        sub="I’m always open to discussing new projects, ideas, and collaborations."
        cta={{ navto: "#contact-form", text: "Reach Out" }}
        extra1={
          <span className="w-full h-fit text-lg min-[498px]:text-xl sm:text-2xl flex items-center justify-center gap-2 font-mono">
            Connect with Me:
            <Typewriter
              spanClassName="!border-teal-400"
              className="!text-teal-300"
              texts={[
                "Let's Build Together",
                "Create Impact",
                "Transform Ideas",
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
            Whether you’re looking to start a project, seek advice, or explore
            collaboration opportunities, I’d love to hear from you. Feel free to
            reach out to{" "}
            <span className="text-neutral-300 dark:text-neutral-400">
              CodeWithAsterixh
            </span>{" "}
            for a conversation about bringing innovative ideas to life.
          </p>
        }
      />

      {children}
    </div>
  );
}

export default ProjectsLayout;
