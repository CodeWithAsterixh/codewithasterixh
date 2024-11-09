import { Button } from "@mui/material";
import React from "react";
import { BiArrowToRight, BiPhone } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";
import { PiGithubLogo, PiLinkedinLogo, PiXLogoBold } from "react-icons/pi";

type Props = object;

function Footer({}: Props) {
  return (
    <footer className="w-[calc(100%-0.5rem)] mx-auto h-fit backdrop-blur-md bg-base-white/80 dark:bg-base-black/80 text-base-black dark:text-base-white p-4 rounded-md flex flex-col flex-wrap gap-3 sm:flex-row items-start justify-start sm:gap-10">
      <section className="size-fit">
        <h4 className="text-xl sm:text-2xl font-bold border-b-2 border-b-base-black/50 dark:border-b-base-white/50">
          Quick Links
        </h4>

        <ul>
          <li>
            <Button
              startIcon={<BiArrowToRight />}
              className="!bg-transparent !text-current !flex !items-center"
            >
              Home
            </Button>
          </li>
        </ul>
      </section>
      <div className="w-full max-w-[300px] flex flex-col gap-3">
        <h4 className="text-xl sm:text-2xl font-bold border-b-2 border-b-base-black/50 dark:border-b-base-white/50">
          Contacts
        </h4>
        <p className="text-base sm:text-lg font-mono">
          Do you want to support asterixh or have any questions? get in touch
        </p>
        ++
        <a
          href="mailto:asterixhco@gmail.com"
          className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-md"
        >
          <BsMailbox className="font-bold text-base-black dark:text-base-white" />{" "}
          <span>Email@&nbsp;</span> asterixhco@gmail.com
        </a>
        <a
          href="tel:+2348109080838"
          className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-md"
        >
          <BiPhone />
          <span>Phone@&nbsp;</span> +234 810 908 0838
        </a>
        <a
          href="www.github.com/CodeWithAsterixh"
          className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-md"
        >
          <PiGithubLogo />
          <span>Github@&nbsp;</span> CodeWithAsterixh
        </a>
        <a
          href="https://www.linkedin.com/in/paul-peter-eyinnaya?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-md"
        >
          <PiLinkedinLogo />
          <span>LinkedIn@&nbsp;</span> Peter Paul
        </a>
        <a
          href="https://x.com/AsterixhThanks?t=URfI8qwSIK1SbDijca99BA&s=09"
          className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-md"
        >
          <PiXLogoBold />
          <span>X@&nbsp;</span> Peter Paul
        </a>
      </div>

      <p className="w-full h-fit pt-4 text-base-black/30 dark:text-base-white/30 text-center font-mono text-sm min-[498px]:text-base sm:text-xl border-t-2 border-t-base-black/20 dark:border-t-base-white/20">
        &copy;copyright CodeWithAsterixh 2024
      </p>
    </footer>
  );
}

export default Footer;
