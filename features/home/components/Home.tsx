import React from "react";
import Link from 'next/link';
import Image from "next/image";
import { Text } from "@/components/ui/atoms/Text/Text";
import { Button } from "@/components/ui/atoms/Button/Button";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";

export const Home: React.FC = () => {
  const featuredSlugs = ["worldtimesage", "anonfly-anonymous-encrypted-messaging", "quizeen-interactive-quiz-platform"];
  const featuredProjects = projectsData.filter(p => featuredSlugs.includes(p.slug)).slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 py-20 lg:py-32 flex flex-col gap-32">
      {/* 1. Hero Section */}
      <section className="relative flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 py-10 md:py-16 px-4 md:px-8 -mx-4 md:-mx-8 overflow-hidden rounded-3xl">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 opacity-20 md:opacity-30 pointer-events-none">
          <Image
            src="/images/my-photo.png"
            alt={`${profileData.name} - Software Engineer Portfolio`}
            fill
            className="object-contain object-center"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative flex flex-col gap-6">
          <Text variant="h1" className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight lg:-ml-1">
            Hi, I’m {profileData.name.split(" ")[0]}.<br/>
            I build platforms that convert.
          </Text>
          <Text variant="body" className="text-xl text-white/70 max-w-3xl mt-4 leading-relaxed font-light">
            A website is useless if it's just an online space. You are likely here because you need a high-performing digital engine that turns visitors into potential clients and leads. From intuitive interfaces to highly scalable Node.js architectures, I build solutions that make that conversion completely frictionless.
          </Text>
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <Button href="/works" variant="primary" icon={ArrowUpRight}>
              View Selected Work
            </Button>
            <Button href="/contact" variant="ghost">
              Let's talk solutions
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Selected Work */}
      <section className="flex flex-col gap-10">
        <Text variant="h2" className="text-sm font-semibold tracking-widest text-white/40 uppercase">
          Proofs of Concept
        </Text>
        <div className="flex flex-col">
          {featuredProjects.map((project, index) => (
            <Link key={project.slug} href={`/works/${project.slug}`} className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 border-t border-white/10 py-10 hover:border-white/30 transition-colors">
              <Text variant="h3" className="text-3xl font-medium text-white group-hover:text-accent transition-colors flex-shrink-0 md:w-1/3">
                {project.title.split('–')[0].trim()}
              </Text>
              <div className="flex flex-col gap-4 flex-1">
                <Text variant="body" className="text-lg text-white/70 leading-relaxed font-light">
                  {/* Fallback to excerpt if we haven't updated JSON yet */}
                  {(project as any).problem || project.excerpt.split('\n')[0]}
                </Text>
                <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors pt-2">
                  <Text variant="caption" className="uppercase tracking-widest font-semibold text-xs">Read the Case Study</Text>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Credibility Layer */}
      <section className="flex flex-col gap-10 border-y border-white/10 py-16 mt-6">
        <h2 className="sr-only">Experience and Trust</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-5xl font-bold text-white tracking-tighter">04+</span>
            <Text variant="body" className="text-white/60 font-light leading-relaxed">Years of strictly engineering resilient, production-ready systems.</Text>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-5xl font-bold text-white tracking-tighter">Stack</span>
            <Text variant="body" className="text-white/60 font-light leading-relaxed">Typescript, Next.js, React, Node.js, and complex state engines.</Text>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-5xl font-bold text-white tracking-tighter">Trust</span>
            <Text variant="body" className="text-white/60 font-light leading-relaxed">Secure, high-performance solutions delivered to 6+ active clients globally.</Text>
          </div>
        </div>
      </section>

      {/* 4. Soft About Preview */}
      <section className="flex flex-col gap-8 mt-10">
        <Text variant="h2" className="text-sm font-semibold tracking-widest text-white/40 uppercase">
          My Philosophy
        </Text>
        <Text variant="body" className="text-2xl md:text-4xl text-white font-medium max-w-4xl leading-snug text-white/90">
          I started in tech with a simple goal: build easy solutions to help people reach a worldwide audience. Today, that means engineering scalable applications where every feature is focused on turning traffic into trusted clients.
        </Text>
        <div className="pt-2">
           <Button href="/about" variant="outline" size="sm" icon={ArrowUpRight}>
             How I think about systems
           </Button>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="flex flex-col items-center text-center gap-6 py-24 px-4 bg-white/5 border border-white/10 rounded-[30px] mt-20">
        <Text variant="h2" className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Let's fix what's broken.
        </Text>
        <Text variant="body" className="text-xl text-white/60 max-w-xl mb-4 font-light leading-relaxed">
          Whether you're struggling with a slow interface, facing an architectural wall, or needing a scalable MVP built properly from day one—I'm here to listen.
        </Text>
        <Button href="/contact" variant="primary" icon={ArrowUpRight} size="lg">
          Start a conversation
        </Button>
      </section>
    </main>
  );
};
