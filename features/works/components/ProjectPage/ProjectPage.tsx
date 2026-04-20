import { Button } from "@/components/ui/atoms/Button/Button";
import { Text } from "@/components/ui/atoms/Text/Text";
import projectsData from "@/data/projects.json";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { RequestLivePreviewButton } from "./RequestLivePreviewButton";

interface ProjectPageProps {
  slug: string;
}

type ProjectRecord = (typeof projectsData)[number];

export const ProjectPage: React.FC<ProjectPageProps> = ({ slug }) => {
  const project: ProjectRecord | undefined = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  const isCaseStudy = !!project.problem;

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 pb-32 pt-12 md:pt-24 flex flex-col gap-12">
      <Button href="/works" variant="ghost" icon={ArrowLeftIcon} iconPosition="left" className="self-start -ml-4">
        Back to Works
      </Button>

      {/* 1. Hook Header */}
      <section className="flex flex-col gap-6">
        <Text variant="caption" className="uppercase tracking-widest text-white/40 font-semibold text-xs">
          {project.category || project.tags[0]}
        </Text>
        <Text variant="h1" className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          {project.title.split('–')[0].trim()}
        </Text>
        {isCaseStudy && (
          <Text variant="h2" className="text-2xl text-white/70 max-w-2xl leading-snug">
            {project.goal}
          </Text>
        )}

        {project.url && (
          <div className="pt-4">
            <RequestLivePreviewButton
              projectSlug={project.slug}
              projectTitle={project.title}
            />
          </div>
        )}
      </section>

      {/* Screenshot / Demo */}
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-white/5 border border-white/10 my-8">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Text variant="h4" className="text-white/30 text-center font-medium">
              No visual preview available
            </Text>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        {/* Main Case Study Content */}
        <div className="md:col-span-8 flex flex-col gap-16">

          {isCaseStudy ? (
            <>
              {/* The Problem */}
              <div className="flex flex-col gap-4">
                <Text variant="h3" className="text-xl font-semibold text-white">The Problem</Text>
                <Text variant="body" className="text-lg text-white/70 leading-relaxed font-light">{project.problem}</Text>
              </div>

              {/* The Build */}
              <div className="flex flex-col gap-8 border-l-2 border-white/10 pl-6 lg:pl-10">
                <Text variant="h3" className="text-2xl font-bold text-white">The Build</Text>

                <div className="flex flex-col gap-3">
                  <Text variant="h4" className="text-base font-semibold text-white/90">Architecture Decisions</Text>
                  <Text variant="body" className="text-lg text-white/70 leading-relaxed font-light">{project.architecture}</Text>
                </div>

                <div className="flex flex-col gap-3">
                  <Text variant="h4" className="text-base font-semibold text-white/90">Key Challenges</Text>
                  <Text variant="body" className="text-lg text-white/70 leading-relaxed font-light">{project.challenges}</Text>
                </div>

                <div className="flex flex-col gap-3">
                  <Text variant="h4" className="text-base font-semibold text-white/90">Solutions</Text>
                  <Text variant="body" className="text-lg text-white/70 leading-relaxed font-light">{project.solutions}</Text>
                </div>
              </div>

              {/* Trade-offs */}
              <div className="flex flex-col gap-4 bg-white/5 p-8 rounded-3xl border border-white/10">
                <Text variant="h3" className="text-xl font-semibold text-white">Trade-offs & Limitations</Text>
                <Text variant="body" className="text-lg text-white/70 leading-relaxed font-light">{project.tradeOffs}</Text>
              </div>

              {/* Lessons Learned */}
              <div className="flex flex-col gap-4">
                <Text variant="h3" className="text-xl font-semibold text-white">Lessons Learned</Text>
                <Text variant="body" className="text-lg text-white/70 leading-relaxed font-light">{project.lessons}</Text>
              </div>

              {/* Outcome */}
              <div className="flex flex-col gap-4 pt-8 border-t border-white/10">
                <Text variant="h3" className="text-xl font-semibold text-white">Outcome</Text>
                <Text variant="body" className="text-xl text-white/90 leading-relaxed font-medium">{project.outcome}</Text>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <Text variant="h3" className="text-xl font-semibold text-white">Overview</Text>
              <Text variant="body" className="text-lg text-white/70 leading-relaxed font-light whitespace-pre-wrap">
                {project.excerpt}
              </Text>
            </div>
          )}
        </div>

        {/* Sidebar / Meta Details */}
        <div className="md:col-span-4 flex flex-col gap-8 md:sticky md:top-32 self-start w-full">
          {/* Tech Stack */}
          <div className="flex flex-col gap-4">
            <Text variant="caption" className="uppercase tracking-widest text-white/40 font-semibold text-xs">Technologies</Text>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool: string, index: number) => (
                <span key={index} className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/80 border border-white/10">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-4 mt-8">
            <Text variant="caption" className="uppercase tracking-widest text-white/40 font-semibold text-xs">Categories</Text>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1 text-sm text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
