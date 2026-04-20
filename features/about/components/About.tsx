import { Button } from "@/components/ui/atoms/Button/Button";
import { Text } from "@/components/ui/atoms/Text/Text";
import profileData from "@/data/profile.json";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import Image from "next/image";

export const About: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-20 lg:py-32 flex flex-col gap-24">
      {/* 1. Hook Header */}
      <section className="relative min-h-[50vh] flex flex-col justify-center gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 py-16 md:py-24 -mx-4 md:-mx-16 px-4 md:px-16 overflow-hidden">

        {/* Centered Background Image */}
        <div className="absolute inset-0 z-0 opacity-20 md:opacity-30 pointer-events-none">
          <Image
            src="/images/profile/about.png"
            alt={`${profileData.name} - About Paul Peter`}
            fill
            className="object-contain object-center"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col gap-10">
          <Text variant="h1" className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight max-w-4xl mx-auto text-center">
            I&apos;m Paul Peter. I engineer high-performing systems through collaborative problem-solving.
          </Text>
        </div>
      </section>

      {/* 2. Story */}
      <section className="flex flex-col gap-6">
        <Text variant="h2" className="text-sm font-semibold tracking-widest text-white/40 uppercase">
          Backstory
        </Text>
        <div className="flex flex-col gap-6 text-lg md:text-xl text-white/80 leading-relaxed font-light">
          <p>
            I started my journey into tech driven by a simple enthusiasm for creating software. I was completely new to the industry, but I possessed one clear goal: I wanted to build easy-to-use solutions that helped everyday people share their value and reach a worldwide audience. That singular focus pushed me deep into the architecture of the web.
          </p>
          <p>
            Over the years, I&apos;ve mastered the core fundamentals and gained deep experience engineering complex systems from the ground up. Through freelance projects and mentoring, I learned that great software requires understanding real problems first, then architecting scalable, maintainable solutions that deliver tangible outcomes.
          </p>
        </div>
      </section>

      {/* 3. How You Think */}
      <section className="flex flex-col gap-6 border-l-2 border-white/10 pl-6 md:pl-10 my-4">
        <Text variant="h2" className="text-sm font-semibold tracking-widest text-white/40 uppercase">
          The Realization
        </Text>
        <div className="flex flex-col gap-4">
          <Text variant="h3" className="text-2xl font-bold text-white">Every system must serve a measurable purpose.</Text>
          <Text variant="body" className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-2xl">
            I realized something important: having a website that doesn&apos;t solve a real problem wastes everyone&apos;s time. I&apos;m dedicated to building production-grade platforms, from real-time messaging protocols to robust e-commerce interfaces, where every line of code is engineered with ownership and care. I collaborate closely with teams, document my decisions transparently, and maintain clean, maintainable code throughout.
          </Text>
        </div>
      </section>

      {/* 4. What You Focus On */}
      <section className="flex flex-col gap-6">
        <Text variant="h2" className="text-sm font-semibold tracking-widest text-white/40 uppercase">
          Core Focus
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <Text variant="h3" className="text-xl font-bold text-white">Backend Architecture & APIs</Text>
            <Text variant="body" className="text-white/70 leading-relaxed font-light">
              Designing scalable database schemas, implementing secure REST and GraphQL APIs, engineering role-based access control (RBAC), and building robust Node.js services optimized for production environments with Postgres and MongoDB.
            </Text>
          </div>
          <div className="flex flex-col gap-3">
            <Text variant="h3" className="text-xl font-bold text-white">Frontend Engineering & UX</Text>
            <Text variant="body" className="text-white/70 leading-relaxed font-light">
              Building responsive interfaces with React and Next.js, managing complex state with Redux Toolkit and Zustand, optimizing performance through efficient rendering, and collaborating with designers to craft user-centered experiences.
            </Text>
          </div>
          <div className="flex flex-col gap-3">
            <Text variant="h3" className="text-xl font-bold text-white">Mentorship & Collaboration</Text>
            <Text variant="body" className="text-white/70 leading-relaxed font-light">
              Committed to building better engineers through clear communication and mentoring. I guide teams through complex technical concepts, foster clean code practices, and contribute effectively to cross-functional projects in agile environments.
            </Text>
          </div>
        </div>
      </section>

      {/* 5. Contact CTA */}
      <section className="flex flex-col items-center text-center gap-6 py-20 px-4 bg-white/5 border border-white/10 rounded-[40px] mt-12">
        <Text variant="h2" className="text-4xl font-bold text-white tracking-tight">
          Let&apos;s figure this out together.
        </Text>
        <Text variant="body" className="text-lg text-white/60 max-w-md mb-4 font-light leading-relaxed">
          Send me a message. Let’s have a real conversation about what’s slowing you down and how we can fix it. No sales jargon, just practical engineering solutions.
        </Text>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" variant="primary" icon={ArrowUpRightIcon}>
            Start a Conversation
          </Button>
          <Button href={profileData.socials.find(s => s.icon === 'github')?.href || '#'} target="_blank" rel="noopener noreferrer" variant="ghost">
            View the Code
          </Button>
        </div>
      </section>
    </main>
  );
};
