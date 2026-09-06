import React from 'react';
import { GraduationCapIcon } from '@phosphor-icons/react';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';

const ACCENT_COLORS = ['#5B9BF3', '#00e599', '#D9A441', '#f59e0b'];

export const StationExperienceView: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
        Career Milestones & Engineering Track Record
      </div>
      <div className="space-y-3">
        {/* Work Experience */}
        {experienceData.map((exp, i) => {
          const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
          const period =
            exp.duration.from === exp.duration.to
              ? `${exp.duration.from}`
              : `${exp.duration.from} – ${exp.duration.to}`;
          return (
            <div
              key={`${exp.name}-${i}`}
              style={{
                clipPath:
                  'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
              }}
              className="p-4 bg-[#1A1A1A] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-white">{exp.role}</span>
                  <span className="text-[10px] text-[#94a3b8] ml-1.5">@ {exp.name}</span>
                </div>
                <span className="text-[10px] font-bold shrink-0" style={{ color }}>
                  {period}
                </span>
              </div>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed">{exp.description}</p>
              <div className="flex flex-wrap gap-1">
                {exp.stacks.map((stack) => (
                  <span
                    key={stack}
                    style={{
                      clipPath:
                        'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
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
              clipPath:
                'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
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
  );
};
