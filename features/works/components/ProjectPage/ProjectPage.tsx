import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, GlobeIcon } from "@phosphor-icons/react/dist/ssr";
import { Text } from "@/components/ui/atoms/Text/Text";
import { Button } from "@/components/ui/atoms/Button/Button";
import { Card } from "@/components/ui/atoms/Card/Card";
import projectsData from "@/data/projects.json";

interface ProjectPageProps {
  slug: string;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ slug }) => {
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 pb-12 pt-12 md:pt-24">
      <Button href="/works" variant="ghost" icon={ArrowLeftIcon} iconPosition="left" className="mb-8">
        Back to Works
      </Button>

      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
            <Text variant="caption" color="gray" className="uppercase tracking-wider">
                {project.tags[0]}
            </Text>
            <Text variant="h1" weight="bold" className="text-4xl md:text-5xl text-white">
                {project.title}
            </Text>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#2a2a2a] border border-white/10">
            {project.thumbnail ? (
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                    No Image Available
                </div>
            )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2 flex flex-col gap-6">
                <Text variant="h3" weight="medium" className="text-white">Overview</Text>
                <Text variant="body" color="gray" className="whitespace-pre-wrap leading-relaxed">
                    {project.excerpt}
                </Text>

                {/* Visit Site Button */}
                {project.url && (
                    <div className="mt-4">
                        <Button
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            icon={GlobeIcon}
                        >
                            Visit Live Site
                        </Button>
                    </div>
                )}
            </div>

            <div className="md:col-span-1 flex flex-col gap-8">
                {/* Tech Stack */}
                <Card className="p-6 bg-[#1a1a1a]">
                    <Text variant="h4" weight="medium" className="mb-4 text-white">Tech Stack</Text>
                    <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool, index) => (
                            <span key={index} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10">
                                {tool}
                            </span>
                        ))}
                    </div>
                </Card>

                {/* Categories */}
                <Card className="p-6 bg-[#1a1a1a]">
                    <Text variant="h4" weight="medium" className="mb-4 text-white">Categories</Text>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
      </div>
    </main>
  );
};
