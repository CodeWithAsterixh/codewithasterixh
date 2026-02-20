import React from "react";
import { Text } from "@/components/ui/atoms/Text/Text";
import { StarFour } from "@phosphor-icons/react/dist/ssr";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import projectsData from "@/data/projects.json";
import uiData from "@/data/ui.json";

export const Works: React.FC = () => {
  // Map projects data to match component expected structure
  const projects = projectsData.map(p => ({
    id: p.slug,
    category: p.tags[0] || "Project",
    title: p.title,
    image: p.thumbnail || "/images/project-placeholder.png" // Fallback if needed
  }));
  
  const totalProjects = projects.length;
  // Initial split logic
  let splitIndex = Math.ceil((totalProjects + 2) / 3);
  
  // Ensure Right Column (Grid) has an even number of items to avoid gaps
  // The Right Column contains the rest of the projects.
  // If (total - splitIndex) is odd, we move one more project from Left to Right.
  if ((totalProjects - splitIndex) % 2 !== 0) {
    splitIndex--;
  }
  
  const leftProjects = projects.slice(0, splitIndex);
  const rightProjects = projects.slice(splitIndex);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-12">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Stack */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 h-auto">
            {leftProjects.map((project) => (
                <ProjectCard 
                    key={project.id} 
                    project={project} 
                    className="h-full min-h-100 flex-1" 
                />
            ))}
        </div>

        {/* Right Column - Header + Grid */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-4">
                    <StarFour size={40} weight="fill" className="text-white/30" />
                    <Text variant="h1" weight="bold" className="uppercase tracking-wide text-5xl md:text-7xl text-white">{uiData.works.hero.title}</Text>
                    <StarFour size={40} weight="fill" className="text-white/30" />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rightProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} className="h-full min-h-100" />
                ))}
            </div>
        </div>
      </div>
    </main>
  );
};
