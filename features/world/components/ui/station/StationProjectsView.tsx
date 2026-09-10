import React from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import projectsData from '@/data/projects.json';

export const StationProjectsView: React.FC = () => {
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
        Featured Production Systems
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featuredProjects.map((p) => (
          <div
            key={p.slug}
            style={{
              clipPath:
                'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
            }}
            className="group flex flex-col justify-between p-4 bg-[#1A1A1A] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:border-[#5B9BF3] transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  style={{
                    clipPath:
                      'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
                  }}
                  className="text-[10px] font-bold px-2 py-0.5 bg-[#5B9BF3]/20 text-[#5B9BF3] border border-black shadow-[1px_1px_0_rgba(0,0,0,1)]"
                >
                  {p.tags[0] || 'Project'}
                </span>
                <a
                  href={(p as any).github ?? undefined}
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
              <Link href={`/works/${p.slug}`} className="text-[#5B9BF3] font-bold hover:underline">
                Read Deep Dive →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
