"use client";

import React from "react";
import { FaGit, FaReact } from "react-icons/fa";
import { RiNextjsLine } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

type Props = object;
interface SkillProps {
  skill: {
    icon: React.ReactNode;
    skill: string;
    duration?: string;
  };
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
  return (
    <li className="w-52 flex-grow basis-48 max-w-full min-[498px]:max-w-[50%] sm:max-w-56 cursor-pointer hover:scale-95 duration-200 h-fit bg-black/5 flex flex-col items-center justify-center gap-2 box-border p-2 shadow-sm border-[1px] border-black/50 rounded-md">
      <span className="text-3xl">{skill.icon}</span>
      <h4
        className={
          "text-base min-[498px]:text-lg sm:text-xl font-mono after:w-10 relative flex items-center justify-center gap-2 flex-col " +
          "after:content-[''] after:relative after:w-10 after:h-0.5 after:bg-red-500/50 after:rounded-full"
        }
      >
        {skill.skill}
        <span className="text-xs min-[498px]:text-sm sm:text-base">
          {skill.duration}
        </span>
      </h4>
    </li>
  );
};

function Skills({}: Props) {
  return (
    <ul className="w-full h-fit flex flex-wrap items-start justify-start gap-3">
      <Skill
        skill={{
          icon: <FaReact />,
          skill: "React",
          duration: "2 years",
        }}
      />
      <Skill
        skill={{
          icon: <RiNextjsLine />,
          skill: "Next js",
          duration: "2 years",
        }}
      />
      <Skill
        skill={{
          icon: <SiTypescript />,
          skill: "Typescript",
          duration: "2 years",
        }}
      />
      <Skill
        skill={{
          icon: <FaGit />,
          skill: "Git flow",
          duration: "2 years",
        }}
      />
      <Skill
        skill={{
          icon: <VscVscode />,
          skill: "Vscode",
          duration: "2 years",
        }}
      />
    </ul>
  );
}

export default Skills;
