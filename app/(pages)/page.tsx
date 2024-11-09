import HeroSection from "@/ui/components/Hero/Hero";
import Skills from "@/ui/components/skills/Skills";
import Typewriter from "@/ui/components/TextWriteMock/TextWriterMock";
import clsx from "clsx";
import Image from "next/image";

export default function Home() {
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
      <section className="w-full h-fit flex flex-col items-start justify-start gap-5 p-4 bg-base-white dark:bg-base-black">
        <section className="group text-base-black dark:text-base-white w-full h-fit flex items-start justify-start gap-3 flex-col">
          <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
            The true Asterixh
          </h1>
          <p className="text-sm min-[498px]:text-base sm:text-lg">
            Hi, I’m Paul Peter—known online as Asterixh. With a passion for
            creating high-impact, user-centered web experiences, I bring a blend
            of creativity and technical expertise to every project. Skilled in
            TypeScript, React, and performance optimization, I focus on building
            seamless, scalable solutions that make a real difference. Let’s turn
            your vision into an exceptional digital experience.
          </p>
        </section>

        <section className="group text-base-black dark:text-base-white w-full h-fit flex items-start justify-start gap-3 flex-col">
          <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
            My Skills
          </h1>
          <Skills />
        </section>
      </section>
    </div>
  );
}
