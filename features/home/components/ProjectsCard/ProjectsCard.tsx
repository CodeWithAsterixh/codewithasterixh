import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import Image from "next/image";
import uiData from "@/data/ui.json";

export const ProjectsCard: React.FC = () => {
  return (
    <Card className="h-full flex flex-col justify-between group">
      <div className="flex-1 flex items-center justify-center mb-6 overflow-hidden rounded-xl bg-white/5 border border-white/5">
         <Image src="/window.svg" width={150} height={100} alt="Project" className="opacity-50 group-hover:scale-105 transition-transform" />
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <Text variant="caption" color="gray" className="mb-1">{uiData.home.projectsCard.subtitle}</Text>
          <Text variant="h4" weight="medium">{uiData.home.projectsCard.title}</Text>
        </div>
        <ArrowButton href="/works" />
      </div>
    </Card>
  );
};
