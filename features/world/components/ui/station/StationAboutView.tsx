import React from 'react';
import profileData from '@/data/profile.json';
import { getOptimizedImageUrl } from '@/features/world/utils/imageProxy';

export const StationAboutView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div
          style={{
            clipPath:
              'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
          }}
          className="w-24 h-24 p-0.5 flex-shrink-0 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-[#141414] overflow-hidden"
        >
          <img
            src={getOptimizedImageUrl(profileData.images.about.src)}
            alt={profileData.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">{profileData.alias}</h3>
          <p className="text-xs text-[#94a3b8]">
            {profileData.role} • {profileData.headline}
          </p>
          <p className="text-xs text-[#EADBCC]/90 leading-relaxed">{profileData.subtext}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {profileData.hero.badges
              .flatMap((b) => b.items)
              .map((badge) => (
                <span
                  key={badge}
                  style={{
                    clipPath:
                      'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
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
              clipPath:
                'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
            }}
            className="p-3 bg-[#1A1A1A] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] text-center"
          >
            <div className="text-lg font-black text-[#D9A441]">{stat.value}</div>
            <div className="text-[9px] text-[#94a3b8] uppercase leading-tight whitespace-pre-line">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          clipPath:
            'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
        }}
        className="p-4 bg-[#0F0F0F] border-2 border-[#384252] space-y-1"
      >
        <div className="text-[10px] font-bold text-[#5B9BF3] uppercase">Mission & Focus</div>
        <p className="text-xs text-[#EADBCC]/80 leading-relaxed italic">
          &ldquo;{profileData.hero.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-[#94a3b8]">
        <span className="flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 fill-current text-[#5B9BF3]"
            viewBox="0 0 16 16"
            style={{ shapeRendering: 'crispEdges' }}
          >
            <path d="M6 1h4v1h2v2h1v4h-1v2h-2v2h-1v2H7v-2H6v-2H4V8H3V4h1V2h2V1zm1 3v3h2V4H7z" />
          </svg>
          {profileData.location}
        </span>
        <span className="flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 fill-current text-[#5B9BF3]"
            viewBox="0 0 16 16"
            style={{ shapeRendering: 'crispEdges' }}
          >
            <path d="M1 3h14v10H1V3zm2 2v1h2v1h2v1h2V7h2V6h2V5H3zm0 6h10V7h-2v1h-2v1H7V8H5V7H3v4z" />
          </svg>
          {profileData.email}
        </span>
      </div>
    </div>
  );
};
