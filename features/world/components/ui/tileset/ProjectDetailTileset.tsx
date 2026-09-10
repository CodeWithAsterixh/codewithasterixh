import React from 'react';
import { ArrowSquareOutIcon, CodeIcon } from '@phosphor-icons/react';
import projectsData from '@/data/projects.json';

interface ProjectDetailTilesetProps {
  projectSlug?: string;
}

export const ProjectDetailTileset: React.FC<ProjectDetailTilesetProps> = ({ projectSlug }) => {
  const project = projectsData.find((p: any) => p.slug === projectSlug) || projectsData[0];

  return (
    <div className="flex flex-col sm:flex-row gap-5 items-start">
      <div className="w-full sm:w-[200px] shrink-0 flex flex-col gap-3">
        <div
          style={{
            clipPath:
              'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
          }}
          className="relative w-full aspect-video sm:aspect-square bg-[#FAF5E6] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] overflow-hidden flex items-center justify-center"
        >
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#5C4F41]">
              <CodeIcon size={32} weight="duotone" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          {(project as any).github && (
            <a
              href={(project as any).github}
              target="_blank"
              rel="noreferrer"
              style={{
                clipPath:
                  'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
              }}
              className="w-full py-2 px-3 bg-[#2C3440] hover:bg-[#374151] text-white font-black uppercase text-xs flex items-center justify-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px"
            >
              <span>View on GitHub</span>
              <ArrowSquareOutIcon size={14} weight="bold" />
            </a>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-3 w-full">
        <div>
          <span
            style={{
              clipPath:
                'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
            }}
            className="px-2 py-0.5 bg-[#243C6E] text-white text-[10px] font-mono font-bold uppercase border border-black shadow-[1px_1px_0_rgba(0,0,0,0.5)]"
          >
            {project.category || 'Project'}
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-[#1F1914] mt-1">{project.title}</h3>
          <p className="text-xs text-[#524436] leading-relaxed mt-1">{project.excerpt}</p>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] uppercase font-bold text-[#6E5C3B]">Technologies</div>
          <div className="flex flex-wrap gap-1">
            {project.tools?.map((tool: string) => (
              <span
                key={tool}
                style={{
                  clipPath:
                    'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
                }}
                className="px-2 py-0.5 bg-[#FAF5E6] border border-black shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-[10px] font-mono font-bold text-[#3D332A]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {project.architecture && (
          <div
            style={{
              clipPath:
                'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
            }}
            className="p-3 bg-[#FAF5E6] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.6)] space-y-1"
          >
            <div className="text-xs font-bold text-[#1F1914]">Overview & Structure</div>
            <p className="text-xs text-[#5C4F41] leading-relaxed">{project.architecture}</p>
          </div>
        )}
      </div>
    </div>
  );
};
