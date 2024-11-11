"use client";
import Skills from "@/ui/components/skills/Skills";
import CenteredTimeline, {
  cardDatas,
} from "@/ui/components/TimeLineCentered/TimeLineCentered";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsBriefcaseFill } from "react-icons/bs";

type Props = object;

function AboutPage({}: Props) {
  const [education, setEducation] = useState<cardDatas[]>();
  const [jobs, setJobs] = useState<cardDatas[]>();
  useEffect(() => {
    async function getDatas() {
      const educations = await axios.get("/api/education");
      const jobs = await axios.get("/api/jobs");
      setEducation(educations.data);
      setJobs(jobs.data);
    }
    getDatas();
  }, []);

  return (
    <section
      id="about"
      className="w-full h-fit flex flex-col items-start justify-start gap-5 p-4 bg-base-white dark:bg-base-black"
    >
      <section className="group text-base-black dark:text-base-white w-full h-fit flex items-start justify-start gap-3 flex-col">
        <div className="w-full h-fit flex items-end justify-between">
          <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
            My Skills
          </h1>
        </div>
        <Skills />
      </section>
      <section className="group text-base-black dark:text-base-white w-full h-fit flex items-center justify-start gap-3 flex-col">
        <div className="w-full h-fit flex items-end justify-between">
          <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
            Education: Learning Map
          </h1>
        </div>
        <CenteredTimeline datas={education} />
      </section>

      <section className="group text-base-black dark:text-base-white w-full h-fit flex items-center justify-start gap-3 flex-col">
        <div className="w-full h-fit flex items-end justify-between">
          <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
            Jobs: My Working experience
          </h1>
        </div>
        <CenteredTimeline datas={jobs} icon={<BsBriefcaseFill />} />
      </section>
    </section>
  );
}

export default AboutPage;
