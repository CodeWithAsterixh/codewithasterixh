"use client";

import { Skeleton, Typography } from "@mui/material";
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

export const SkillSkeleton: React.FC = () => {
  return (
    <div className="w-1/2 flex-grow basis-24 min-[498px]:basis-32 max-w-full min-[498px]:max-w-[50%] sm:max-w-56 cursor-pointer hover:scale-95 duration-200 h-fit bg-black/5 flex flex-col items-center justify-center gap-2 box-border p-2 shadow-sm border-[1px] border-black/50 rounded-md">
      <Skeleton variant="circular" width={20} height={20} />
      <Skeleton variant="text" width={10} sx={{ fontSize: "0.5rem" }} />
      <Skeleton variant="text" width={5} sx={{ fontSize: "0.125rem" }} />
    </div>
  );
};

const Skill: React.FC<SkillProps> = ({ skill }) => {
  return (
    <li className="w-1/2 flex-grow basis-24 min-[498px]:basis-32 max-w-full min-[498px]:max-w-[50%] sm:max-w-56 cursor-pointer hover:scale-95 duration-200 h-fit bg-black/5 flex flex-col items-center justify-center gap-2 box-border p-2 shadow-sm border-[1px] border-black/50 rounded-md">
      <span className="text-3xl">{skill.icon}</span>

      <Typography
        component="h4"
        className="text-base min-[498px]:text-lg sm:text-xl font-mono after:w-10 relative flex items-center justify-start gap-2 flex-col"
        sx={{
          "&::after": {
            content: '""',
            width: "2.5rem",
            height: "2px",
            backgroundColor: "red",
            opacity: 0.5,
            borderRadius: "full",
            display: "block",
          },
        }}
      >
        {skill.skill}
      </Typography>
      <Typography variant="body2">{skill.duration}</Typography>
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
