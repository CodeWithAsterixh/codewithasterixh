import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import { ProjectCardProps } from "../../types/works";

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = "" }) => {
  return (
    <Card className={`group flex flex-col justify-between p-6 ${className}`}>
      <div className="relative w-full aspect-4/3 mb-6 rounded-2xl overflow-hidden bg-[#2a2a2a]">
         <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
         />
      </div>
      
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <Text variant="caption" color="gray" className="uppercase tracking-wider text-xs">
            {project.category}
          </Text>
          <Text variant="h4" weight="medium" className="text-white">
            {project.title}
          </Text>
        </div>
        <ArrowButton href={`/works/${project.id}`} />
      </div>
    </Card>
  );
};
