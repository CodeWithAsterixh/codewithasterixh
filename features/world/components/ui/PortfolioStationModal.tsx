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
import profileData from '@/data/profile.json';
import techStackData from '@/data/tech-stack.json';
import experienceData from '@/data/experience.json';
import servicesData from '@/data/services.json';
import educationData from '@/data/education.json';


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
      {/* Pixelated Modal Card */}
      <div
        style={{
          clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))'
        }}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#141414] border-4 border-[#384252] shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden text-[#EADBCC]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black bg-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <span
              style={{
                clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
              }}
              className={`w-9 h-9 flex items-center justify-center font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${location.category === 'city' ? 'bg-[#5B9BF3] text-black' : 'bg-[#00e599] text-black'
              }`}
            >
              {location.category === 'city' ? <BuildingsIcon size={20} weight="duotone" /> : <TreeIcon size={20} weight="duotone" />}
            </span>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8]">
                {location.tag}
              </div>
              <h2 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                {location.featureTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
            }}
            className="w-8 h-8 bg-[#2C3440] hover:bg-[#3E4856] active:translate-x-px active:translate-y-px border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close station modal"
          >
            <XIcon size={16} weight="bold" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Station Overview Banner */}
          <div
            style={{
              clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
            }}
            className="p-4 bg-[#0F0F0F] border-2 border-[#384252] shadow-[3px_3px_0px_rgba(0,0,0,1)] text-xs text-[#EADBCC]/80 leading-relaxed"
          >
            {location.description}
          </div>

          {/* DYNAMIC CONTENT PER FEATURE TYPE */}
          {location.featureType === 'about' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div
                  style={{
                    clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                  }}
                  className="w-24 h-24 p-0.5 flex-shrink-0 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-[#141414] overflow-hidden"
                >
                  <img
                    src={profileData.images.about.src}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{profileData.alias}</h3>
                  <p className="text-xs text-[#94a3b8]">
                    {profileData.role} • {profileData.headline}
                  </p>
                  <p className="text-xs text-[#EADBCC]/90 leading-relaxed">
                    {profileData.subtext}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {profileData.hero.badges.flatMap((b) => b.items).map((badge) => (
                      <span
                        key={badge}
                        style={{
                          clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                        }}
                        className="px-2 py-0.5 bg-[#5B9BF3]/10 text-[#5B9BF3] border border-black text-[10px] font-bold"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {profileData.stats.map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                    }}
                    className="p-3 bg-[#1A1A1A] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] text-center"
                  >
                    <div className="text-lg font-black text-[#D9A441]">{stat.value}</div>
                    <div className="text-[9px] text-[#94a3b8] uppercase leading-tight whitespace-pre-line">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
                className="p-4 bg-[#0F0F0F] border-2 border-[#384252] space-y-1"
              >
                <div className="text-[10px] font-bold text-[#5B9BF3] uppercase">Mission & Focus</div>
                <p className="text-xs text-[#EADBCC]/80 leading-relaxed italic">
                  &ldquo;{profileData.hero.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#94a3b8]">
                <span>📍 {profileData.location}</span>
                <span>✉️ {profileData.email}</span>
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
                    style={{
                      clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                    }}
                    className="group flex flex-col justify-between p-4 bg-[#1A1A1A] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:border-[#5B9BF3] transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          style={{
                            clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                          }}
                          className="text-[10px] font-bold px-2 py-0.5 bg-[#5B9BF3]/20 text-[#5B9BF3] border border-black shadow-[1px_1px_0_rgba(0,0,0,1)]"
                        >
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {([
                  { key: 'Technical' as const, color: '#5B9BF3', Icon: CodeIcon },
                  { key: 'Creative & UI' as const, color: '#00e599', Icon: SparkleIcon },
                  { key: 'Other Skills' as const, color: '#D9A441', Icon: BriefcaseIcon },
                ]).map(({ key, color, Icon }) => (
                  <div
                    key={key}
                    style={{
                      clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                    }}
                    className="p-4 bg-[#1A1A1A] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-2.5"
                  >
                    <div className="text-xs font-bold flex items-center gap-1.5" style={{ color }}>
                      <Icon size={16} weight="duotone" />
                      <span>{key}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(techStackData as Record<string, { name: string }[]>)[key]?.map((s) => (
                        <span
                          key={s.name}
                          style={{
                            clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                          }}
                          className="px-2 py-1 bg-[#0F0F0F] text-[11px] border border-black shadow-[1px_1px_0_rgba(0,0,0,1)] text-white font-medium"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
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
                {servicesData.map((service, i) => {
                  const colors = ['#5B9BF3', '#00e599', '#D9A441'];
                  const color = colors[i % colors.length];
                  return (
                    <div
                      key={service.label}
                      style={{
                        clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                      }}
                      className="p-4 bg-[#1A1A1A] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-1.5"
                    >
                      <div className="text-xs font-bold" style={{ color }}>
                        {i + 1}. {service.label}
                      </div>
                      <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                            }}
                            className="px-1.5 py-0.5 text-[9px] font-bold border border-black bg-[#0F0F0F] text-[#EADBCC]/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {location.featureType === 'experience' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
                Career Milestones & Engineering Track Record
              </div>
              <div className="space-y-3">
                {/* Work Experience */}
                {experienceData.map((exp, i) => {
                  const accentColors = ['#5B9BF3', '#00e599', '#D9A441', '#f59e0b'];
                  const color = accentColors[i % accentColors.length];
                  const period = exp.duration.from === exp.duration.to
                    ? `${exp.duration.from}`
                    : `${exp.duration.from} – ${exp.duration.to}`;
                  return (
                    <div
                      key={`${exp.name}-${i}`}
                      style={{
                        clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                      }}
                      className="p-4 bg-[#1A1A1A] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-bold text-white">{exp.role}</span>
                          <span className="text-[10px] text-[#94a3b8] ml-1.5">@ {exp.name}</span>
                        </div>
                        <span className="text-[10px] font-bold shrink-0" style={{ color }}>{period}</span>
                      </div>
                      <p className="text-[11px] text-[#94a3b8] leading-relaxed">{exp.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {exp.stacks.map((stack) => (
                          <span
                            key={stack}
                            style={{
                              clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                            }}
                            className="px-1.5 py-0.5 text-[9px] border border-black bg-[#0F0F0F] text-[#EADBCC]/60"
                          >
                            {stack}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {/* Education */}
                {educationData.map((edu, i) => (
                  <div
                    key={`${edu.name}-${i}`}
                    style={{
                      clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                    }}
                    className="p-4 bg-[#1A1A1A] border-2 border-[#5B9BF3]/30 shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <GraduationCapIcon size={14} weight="duotone" className="text-[#D9A441] shrink-0" />
                        <span className="text-xs font-bold text-white">{edu.title}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#D9A441] shrink-0">
                        {edu.duration.from} – {edu.duration.to}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#94a3b8]">{edu.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {location.featureType === 'contact' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
                Dispatch Message or Schedule Consultation
              </div>
              <div
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
                className="p-5 bg-[#1A1A1A] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-4 text-center"
              >
                <div
                  style={{
                    clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                  }}
                  className="w-12 h-12 bg-[#5B9BF3]/20 text-[#5B9BF3] mx-auto flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  <EnvelopeSimpleIcon size={24} weight="duotone" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Direct Engineering Inquiries</h4>
                  <p className="text-xs text-[#94a3b8]">
                    Reach out directly for freelance contracts, full-time architecture roles, or interactive web projects.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`mailto:${profileData.email}`}
                    style={{
                      clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                    }}
                    className="px-5 py-2.5 bg-[#5B9BF3] hover:bg-[#72adfb] text-black text-xs font-bold transition-all border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px"
                  >
                    ✉️ {profileData.email}
                  </a>
                  <Link
                    href="/contact"
                    style={{
                      clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                    }}
                    className="px-5 py-2.5 bg-[#262626] hover:bg-[#333] text-white text-xs font-bold border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all active:translate-x-px active:translate-y-px"
                  >
                    Open Contact Form →
                  </Link>
                </div>
                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 pt-2 border-t border-white/5">
                  {profileData.socials.map((social) => {
                    const Icon = social.icon === 'github' ? GithubLogoIcon
                      : social.icon === 'linkedin' ? LinkedinLogoIcon
                      : TwitterLogoIcon;
                    return (
                      <a
                        key={social.icon}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                        }}
                        className="w-9 h-9 bg-[#1A1A1A] hover:bg-[#2C3440] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#94a3b8] hover:text-white flex items-center justify-center transition-all"
                      >
                        <Icon size={18} weight="duotone" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t-2 border-black bg-[#1A1A1A] text-xs">
          <div className="text-[10px] text-[#94a3b8] flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 bg-[#0F0F0F] border border-black shadow-[1px_1px_0_rgba(0,0,0,1)] text-white font-mono font-bold">ESC</kbd> or click Close to return to the world</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              style={{
                clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
              }}
              className="px-4 py-2 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] font-black uppercase text-xs transition-all border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px cursor-pointer"
            >
              Resume Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
