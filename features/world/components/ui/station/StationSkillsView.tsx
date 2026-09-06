import React from 'react';
import { CodeIcon, SparkleIcon, BriefcaseIcon } from '@phosphor-icons/react';
import techStackData from '@/data/tech-stack.json';

const SKILL_SECTIONS = [
  { key: 'Technical' as const, color: '#5B9BF3', Icon: CodeIcon },
  { key: 'Creative & UI' as const, color: '#00e599', Icon: SparkleIcon },
  { key: 'Other Skills' as const, color: '#D9A441', Icon: BriefcaseIcon },
];

export const StationSkillsView: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
        Engineering Toolchain & Proficiencies
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SKILL_SECTIONS.map(({ key, color, Icon }) => (
          <div
            key={key}
            style={{
              clipPath:
                'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
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
                    clipPath:
                      'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
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
  );
};
