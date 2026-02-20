import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ExperienceCardProps } from "./ExperienceCard.types";

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, items, className }) => {
  return (
    <Card className={`p-8 md:p-10 ${className}`}>
      <Text variant="h4" weight="medium" className="uppercase mb-8">{title}</Text>
      
      <div className="flex flex-col gap-8">
        {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-1 border-b border-white/5 pb-8 last:border-0 last:pb-0">
                <Text variant="body" color="gray" className="mb-1">{item.period}</Text>
                <Text variant="h4" weight="medium" color="white">{item.title}</Text>
                <Text variant="caption" color="gray" className="normal-case tracking-normal text-sm">{item.subtitle}</Text>
            </div>
        ))}
      </div>
    </Card>
  );
};
