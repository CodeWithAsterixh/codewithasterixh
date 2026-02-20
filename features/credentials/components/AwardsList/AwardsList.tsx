import React from "react";
import { Text } from "@/components/ui/atoms/Text/Text";

interface Award {
  date: string;
  title: string;
  subtitle: string;
}

const awards: Award[] = [
  { date: "14 May 2020", title: "Bluebase", subtitle: "Non enim praesent" },
  { date: "26 June 2018", title: "Demble", subtitle: "Non enim praesent" },
];

export const AwardsList: React.FC = () => {
  return (
    <div>
      <Text variant="h4" weight="medium" className="uppercase mb-8 text-white">Awards</Text>
      <div className="flex flex-col gap-8">
        {awards.map((award, index) => (
          <div key={index} className="flex flex-col gap-1">
            <Text variant="caption" color="gray" className="mb-1">{award.date}</Text>
            <Text variant="h4" weight="medium" className="text-white">{award.title}</Text>
            <Text variant="caption" color="gray" className="opacity-50">{award.subtitle}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
