import { Text } from "@/components/ui/atoms/Text/Text";
import projectsData from "@/data/projects.json";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from 'next/link';
import React from "react";

export const Works: React.FC = () => {
  const featuredSlugs = [
    "worldtimesage",
    "anonfly-anonymous-encrypted-messaging",
    "quizeen-interactive-quiz-platform",
    "workup-cards-business-card-generator",
    "sms-comprehensive-school-management"
  ];
  
  const allProjects = projectsData.map(p => ({
    id: p.slug,
    category: p.tags[0] || "Project",
    title: p.title.split('–')[0].trim(),
    image: p.thumbnail,
    problem: (p).problem || p.excerpt.split('\n')[0]
  }));

  const featuredProjects = allProjects.filter(p => featuredSlugs.includes(p.id));
  const otherProjects = allProjects.filter(p => !featuredSlugs.includes(p.id));

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 pb-32 pt-12 md:pt-24 flex flex-col gap-24">
      {/* Header */}
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Text variant="h1" className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
          Selected Works
        </Text>
        <Text variant="body" className="text-xl text-white/70 max-w-2xl">
          A collection of systems I&apos;ve engineered, emphasizing problem-solving, clean architecture, and delivering measurable outcomes for real users.
        </Text>
      </div>

      {/* Section 1: Featured Projects */}
      <section className="flex flex-col gap-12">
        <Text variant="h2" className="text-sm font-semibold tracking-widest text-white/40 uppercase">
          Featured Architecture
        </Text>
        
        <div className="flex flex-col gap-12 sm:gap-20">
          {featuredProjects.map((project) => (
            <Link key={project.id} href={`/works/${project.id}`} className="group flex flex-col gap-6 w-full">
              <div className="relative w-full aspect-video md:aspect-21/9 rounded-3xl overflow-hidden bg-white/5 border border-white/10">
                  {project.image ? (
                      <Image
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                  ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Text variant="h4" className="text-white/30 text-center font-medium">
                            {project.title}
                        </Text>
                      </div>
                  )}
              </div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 px-2">
                 <div className="flex flex-col gap-2 max-w-2xl">
                    <Text variant="h3" className="text-3xl font-bold text-white group-hover:text-accent transition-colors">
                      {project.title}
                    </Text>
                    <Text variant="body" className="text-lg text-white/70">
                      {project.problem}
                    </Text>
                 </div>
                 <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors shrink-0 pt-2">
                    <Text variant="caption" className="uppercase tracking-widest font-semibold text-xs">Read Case Study</Text>
                    <ArrowUpRight size={16} />
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 2: Other Projects */}
      <section className="flex flex-col gap-10 border-t border-white/10 pt-16">
        <Text variant="h2" className="text-sm font-semibold tracking-widest text-white/40 uppercase">
          Other Explorations
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map((project) => (
              <Link 
                key={project.id} 
                href={`/works/${project.id}`} 
                className="group flex flex-col gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/30 transition-colors"
               >
                 <div className="flex justify-between items-start">
                    <Text variant="caption" className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2 block">
                      {project.category}
                    </Text>
                    <ArrowUpRight size={16} className="text-white/30 group-hover:text-white transition-colors" />
                 </div>
                 <Text variant="h3" className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                   {project.title}
                 </Text>
                 <Text variant="body" className="text-white/70 line-clamp-3 leading-relaxed">
                   {project.problem}
                 </Text>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
};
