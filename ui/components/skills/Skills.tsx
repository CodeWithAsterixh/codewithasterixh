'use client'

import React, { useState } from "react";
import { FaReact } from "react-icons/fa";

type Props = {};
interface SkillProps {
  skill: {
    icon: React.ReactNode;
    skill: string;
    duration?: string;
    others?: string[];
  };
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
  const [hover, setHover] = useState(false);

  const toggleSetHover = () => setHover(!hover);

  return (
    <li
      className="relative group flex-grow basis-[200px] min-[362px]:max-w-[300px] min-w-full min-[362px]:min-w-[50%] min-[498px]:min-w-24 flex flex-col mt-0"
      onMouseEnter={toggleSetHover}
      onMouseLeave={toggleSetHover}
    >
      <div className="relative py-2 flex items-center gap-2 border-l-2 border-t-2 group-hover:border-b-2 border-neutral-800 dark:border-neutral-200 pl-4">
        <span className="w-5 h-5">{skill.icon}</span>
        <b>{skill.skill}</b>
      </div>
      {hover && (
        <ul className="flex flex-col gap-1 pl-8 mt-2 list-none text-base-black dark:text-base-white">
          {skill.others && Array.isArray(skill.others) ? (
            skill.others.map((item, index) => (
              <li
                key={index}
                className="relative pl-4 border-l-2 border-neutral-800 dark:border-neutral-200"
              >
                <span className="absolute w-2.5 h-2.5 bg-neutral-800 dark:bg-bg-neutral-200 rounded-full -left-3 top-1/2 transform -translate-y-1/2" />
                {item}
              </li>
            ))
          ) : (
            <li className="relative -mt-2.5 pl-4 border-l-2 border-neutral-800 dark:border-neutral-200">
              <span className="absolute w-2.5 h-2.5 bg-neutral-800 dark:bg-neutral-200 rounded-full -left-[0.35rem] -top-1" />
              {skill.duration}
            </li>
          )}
        </ul>
      )}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 transform rotate-45 -translate-y-1 -translate-x-1" />
    </li>
  );
};



function Skills({}: Props) {
  return (
    <ul>
      <Skill  skill={{
        icon: <FaReact/>,
        skill: 'React',
        duration: '2 years'
      }} />
    </ul>
  );
}

export default Skills;
