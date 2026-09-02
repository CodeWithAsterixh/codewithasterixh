'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapLocationEntry } from '../../data/mapLayout';
import { LayeredButton } from './LayeredButton';
import {
  XIcon,
  BuildingsIcon,
  TreeIcon,
  ArrowUpRightIcon,
  CodeIcon,
  SparkleIcon,
  EnvelopeSimpleIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  CheckCircleIcon,
  GlobeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
} from '@phosphor-icons/react';
import projectsData from '@/data/projects.json';

interface PortfolioStationModalProps {
  location: MapLocationEntry;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const PortfolioStationModal: React.FC<PortfolioStationModalProps> = ({
  location,
  onClose,
  onOpenContact,
}) => {
  // Pre-filter project data if this is a project station
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 font-pixelify select-none">
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#141414] border-2 border-[#323232] rounded-3xl shadow-2xl overflow-hidden text-[#EADBCC]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <span className={`w-9 h-9 rounded-md flex items-center justify-center font-bold shadow-md ${location.category === 'city' ? 'bg-[#5B9BF3] text-black' : 'bg-[#00e599] text-black'
              }`}>
              {location.category === 'city' ? <BuildingsIcon size={20} weight="duotone" /> : <TreeIcon size={20} weight="duotone" />}
            </span>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8]">
                {location.tag}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {location.featureTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-md bg-[#262626] hover:bg-[#333] active:scale-95 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close station modal"
          >
            <XIcon size={18} weight="duotone" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Station Overview Banner */}
          <div className="p-4 rounded-2xl bg-[#0F0F0F] border border-white/5 text-xs text-[#EADBCC]/80 leading-relaxed">
            {location.description}
          </div>

          {/* DYNAMIC CONTENT PER FEATURE TYPE */}
          {location.featureType === 'about' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#5B9BF3] to-[#00e599] p-1 flex-shrink-0 shadow-lg">
                  <div className="w-full h-full bg-[#141414] rounded-md flex items-center justify-center text-3xl font-black text-[#5B9BF3]">
                    AX
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Asterixh</h3>
                  <p className="text-xs text-[#94a3b8]">
                    Full-Stack Software Engineer • Interactive Graphics & Distributed Systems
                  </p>
                  <p className="text-xs text-[#EADBCC]/90 leading-relaxed">
                    I build resilient full-stack web applications, interactive canvas & game worlds, and scalable APIs. Obsessed with high performance, clean architectures, and delightful interactive user experiences.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-md bg-[#1A1A1A] border border-white/5 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#5B9BF3]">Architecture</div>
                  <div className="text-xs font-bold text-white">Modular & Resilient</div>
                </div>
                <div className="p-3.5 rounded-md bg-[#1A1A1A] border border-white/5 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#00e599]">Performance</div>
                  <div className="text-xs font-bold text-white">Sub-100ms Responses</div>
                </div>
                <div className="p-3.5 rounded-md bg-[#1A1A1A] border border-white/5 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#EADBCC]">Visual Systems</div>
                  <div className="text-xs font-bold text-white">2D/3D Canvas & WebGL</div>
                </div>
              </div>
            </div>
          )}

          {location.featureType === 'projects' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
                Featured Production Systems
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredProjects.map((p) => (
                  <div
                    key={p.slug}
                    className="group flex flex-col justify-between p-4 rounded-2xl bg-[#1A1A1A] border border-[#323232] hover:border-[#5B9BF3] transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#5B9BF3]/20 text-[#5B9BF3]">
                          {p.tags[0] || 'Project'}
                        </span>
                        <a
                          href={p.url ?? undefined}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#94a3b8] hover:text-white"
                        >
                          <ArrowUpRightIcon size={16} weight="duotone" />
                        </a>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#5B9BF3] transition-colors">
                        {p.title.split('–')[0].trim()}
                      </h4>
                      <p className="text-[11px] text-[#94a3b8] line-clamp-2 leading-relaxed">
                        {p.problem || p.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-[#EADBCC]/70">
                      <span>{p.tools[0]}</span>
                      <Link
                        href={`/works/${p.slug}`}
                        className="text-[#5B9BF3] font-bold hover:underline"
                      >
                        Read Deep Dive →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {location.featureType === 'skills' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
                Engineering Toolchain & Proficiencies
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-white/5 space-y-2.5">
                  <div className="text-xs font-bold text-[#5B9BF3] flex items-center gap-1.5">
                    <CodeIcon size={16} weight="duotone" />
                    <span>Frontend & Graphics</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['TypeScript', 'React 19', 'Next.js 16', 'Tailwind CSS', 'p5.js', 'WebGL', 'Redux', 'GSAP'].map((s) => (
                      <span key={s} className="px-2 py-1 bg-[#0F0F0F] rounded-lg text-[11px] border border-white/10 text-white font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-white/5 space-y-2.5">
                  <div className="text-xs font-bold text-[#00e599] flex items-center gap-1.5">
                    <BriefcaseIcon size={16} weight="duotone" />
                    <span>Backend & Cloud Infrastructure</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST / GraphQL', 'JWT / CSRF', 'Docker', 'Vercel / AWS'].map((s) => (
                      <span key={s} className="px-2 py-1 bg-[#0F0F0F] rounded-lg text-[11px] border border-white/10 text-white font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {location.featureType === 'services' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
                Available Capabilities & Engineering Solutions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#323232] space-y-1.5">
                  <div className="text-xs font-bold text-[#5B9BF3]">1. Full-Stack Web Applications</div>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                    End-to-end architectures utilizing Next.js, TypeScript, robust authentication, and relational/document databases.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#323232] space-y-1.5">
                  <div className="text-xs font-bold text-[#00e599]">2. Interactive 2D/3D Canvas Systems</div>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                    Hardware-accelerated graphics engines, procedural world generation, and game loop simulations.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#323232] space-y-1.5">
                  <div className="text-xs font-bold text-[#EADBCC]">3. Real-Time Distributed Services</div>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                    WebSocket pipelines, encrypted state synchronization, and high-concurrency microservices.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#323232] space-y-1.5">
                  <div className="text-xs font-bold text-[#f59e0b]">4. Performance & Core Web Vitals</div>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                    Deep bundle auditing, sub-second TTFB optimizations, and accessible responsive interfaces.
                  </p>
                </div>
              </div>
            </div>
          )}

          {location.featureType === 'experience' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
                Career Milestones & Engineering Track Record
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Lead Full-Stack Solutions Architect</span>
                    <span className="text-[10px] text-[#5B9BF3]">2023 – Present</span>
                  </div>
                  <p className="text-[11px] text-[#94a3b8]">
                    Designing and deploying high-throughput client web systems, custom canvas simulations, and cloud deployments.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Independent Software Engineer & Creator</span>
                    <span className="text-[10px] text-[#00e599]">2021 – 2023</span>
                  </div>
                  <p className="text-[11px] text-[#94a3b8]">
                    Built and shipped open-source products including Quizeen, WorldTimeSage, and interactive developer utilities.
                  </p>
                </div>
              </div>
            </div>
          )}

          {location.featureType === 'contact' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
                Dispatch Message or Schedule Consultation
              </div>
              <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#323232] space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#5B9BF3]/20 text-[#5B9BF3] mx-auto flex items-center justify-center">
                  <EnvelopeSimpleIcon size={24} weight="duotone" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Direct Engineering Inquiries</h4>
                  <p className="text-xs text-[#94a3b8]">
                    Reach out directly for freelance contracts, full-time architecture roles, or interactive web projects.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <a
                    href="mailto:contact@asterixh.dev"
                    className="px-5 py-2.5 rounded-md bg-[#5B9BF3] text-black text-xs font-bold hover:bg-[#72adfb] transition-all shadow-md"
                  >
                    Send Email (contact@asterixh.dev)
                  </a>
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 rounded-md bg-[#262626] text-white text-xs font-bold hover:bg-[#333] border border-white/10 transition-all"
                  >
                    Open Contact Form →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#262626] bg-[#1A1A1A] text-xs">
          <div className="text-[10px] text-[#94a3b8] flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 bg-[#0F0F0F] rounded text-white font-bold">ESC</kbd> or click Close to return to the world</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#262626] hover:bg-[#333] text-white font-bold transition-all border border-white/10 cursor-pointer"
            >
              Resume Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
