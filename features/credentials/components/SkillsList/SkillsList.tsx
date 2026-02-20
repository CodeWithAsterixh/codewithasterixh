import React from "react";
import { Text } from "@/components/ui/atoms/Text/Text";
import techStackData from "@/data/tech-stack.json";
import uiData from "@/data/ui.json";

export const SkillsList: React.FC = () => {
  return (
    <div className="mb-12">
      <Text variant="h4" weight="medium" className="uppercase mb-8 text-white">{uiData.credentials.skills.title}</Text>
      <div className="grid grid-cols-2 gap-y-8 gap-x-4">
        {techStackData.map((skill, index) => (
          <div key={index} className="flex flex-col gap-1">
            <Text variant="body" color="gray" className="mb-1">{skill.proficiency}%</Text>
            <Text variant="h4" weight="medium" className="text-white">{skill.name}</Text>
            <Text variant="caption" color="gray" className="opacity-50">{uiData.credentials.skills.proficiency}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
