"use client";

import { ProjectSchema } from "@/public/files/projects";
import WorkCard, { WorkCardSkeleton } from "@/ui/components/Works/WorkCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { WorkGrid } from "../../../ui/components/Works/WorkGrid";

type Props = object;

function ProjectsPage({}: Props) {
  const [recentProjects, setRecentProjects] = useState<ProjectSchema[]>(
    
  );
  useEffect(() => {
    async function getRecent() {
      const recent = await axios.get("/api/projects");
      setRecentProjects(recent.data);
    }
    getRecent();
  }, []);
  return (
    <section className="w-full h-fit flex flex-col items-start justify-start gap-5 p-4 bg-base-white dark:bg-base-black">
      <section className="group text-base-black dark:text-base-white w-full h-fit flex items-start justify-start gap-3 flex-col">
        <div className="w-full h-fit flex items-end justify-between">
          <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
            My works
          </h1>
        </div>

        <WorkGrid works={recentProjects}/>
      </section>
    </section>
  );
}

export default ProjectsPage;
