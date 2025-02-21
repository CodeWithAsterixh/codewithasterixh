"use client";

import { ProjectSchema, projectType } from "@/public/files/projects";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { WorkGrid } from "../../../ui/components/Works/WorkGrid";
import { Button } from "@mui/material";
import clsx from "clsx";
import Typewriter from "@/ui/components/TextWriteMock/TextWriterMock";
import HeroSection from "@/ui/components/Hero/Hero";

type Props = object;

function ProjectsPage({}: Props) {
  const [recentProjects, setRecentProjects] = useState<ProjectSchema[]>();
  const [type, setType] = useState<projectType | "all">("all");
  useEffect(() => {
    async function getRecent() {
      const recent = await axios.get("/api/projects");
      setRecentProjects(recent.data);
    }
    getRecent();
  }, []);

  const handleSetType = useCallback(
    (type: projectType | "all") => {
      setType(type);
    },
    []
  );

  return (
    <div className="size-full">
      <HeroSection
        main="Project | Showcasing My Works"
        sub="Explore a selection of projects built with passion and precision."
        cta={{ navto: "#portfolio", text: "View My Projects" }}
        extra1={
          <span className="w-full h-fit flex-col text-lg min-[498px]:text-xl sm:text-2xl flex items-center justify-center gap-2 font-mono">
            
            <strong>Project Highlights:</strong>
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

<section className="w-full h-fit flex flex-col items-start justify-start gap-5 p-4 bg-base-white/30 dark:bg-base-black/30 backdrop-blur-lg rounded-lg">
      <section className="group text-base-black dark:text-base-white w-full h-fit flex items-start justify-start gap-3 flex-col">
        <div className="w-full h-fit flex items-end justify-between">
          <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
            My works
          </h1>
        </div>
        <header className="w-full flex gap-2">
          <Button
            variant="contained"
            className={clsx(
              type === "all" ? "bg-neutral-900" : "bg-neutral-600"
            )}
            onClick={() => handleSetType("all")}
          >
            All
          </Button>
          <Button
            variant="contained"
            className={clsx(
              type === "best" ? "bg-neutral-900" : "bg-neutral-600"
            )}
            onClick={() => handleSetType("best")}
          >
            Best
          </Button>
          <Button
            variant="contained"
            className={clsx(
              type === "others" ? "bg-neutral-900" : "bg-neutral-600"
            )}
            onClick={() => handleSetType("others")}
          >
            Others
          </Button>
        </header>

        <WorkGrid
          works={
            type === "all"
              ? recentProjects
              : recentProjects?.filter((p) => p.type == type)
          }
        />
      </section>
    </section>
    </div>
    
  );
}

export default ProjectsPage;
