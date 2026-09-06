import React from 'react';
import servicesData from '@/data/services.json';

const SERVICE_COLORS = ['#5B9BF3', '#00e599', '#D9A441'];

export const StationServicesView: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
        Available Capabilities & Engineering Solutions
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {servicesData.map((service, i) => {
          const color = SERVICE_COLORS[i % SERVICE_COLORS.length];
          return (
            <div
              key={service.label}
              style={{
                clipPath:
                  'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
              }}
              className="p-4 bg-[#1A1A1A] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-1.5"
            >
              <div className="text-xs font-bold" style={{ color }}>
                {i + 1}. {service.label}
              </div>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed">{service.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      clipPath:
                        'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
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
  );
};
