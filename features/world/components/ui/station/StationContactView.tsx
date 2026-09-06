import React from 'react';
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
} from '@phosphor-icons/react';
import profileData from '@/data/profile.json';

interface StationContactViewProps {
  onClose: () => void;
  onOpenContact?: () => void;
}

export const StationContactView: React.FC<StationContactViewProps> = ({ onClose, onOpenContact }) => {
  return (
    <div className="space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
        Dispatch Message or Schedule Consultation
      </div>
      <div
        style={{
          clipPath:
            'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
        }}
        className="p-5 bg-[#1A1A1A] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-4 text-center"
      >
        <div
          style={{
            clipPath:
              'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
          }}
          className="w-12 h-12 bg-[#5B9BF3]/20 text-[#5B9BF3] mx-auto flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          <EnvelopeSimpleIcon size={24} weight="duotone" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Direct Engineering Inquiries</h4>
          <p className="text-xs text-[#94a3b8]">
            Reach out directly for freelance contracts, full-time architecture roles, or interactive web
            projects.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`mailto:${profileData.email}`}
            style={{
              clipPath:
                'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#5B9BF3] hover:bg-[#72adfb] text-black text-xs font-bold transition-all border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px"
          >
            <svg
              className="w-3.5 h-3.5 fill-current text-black"
              viewBox="0 0 16 16"
              style={{ shapeRendering: 'crispEdges' }}
            >
              <path d="M1 3h14v10H1V3zm2 2v1h2v1h2v1h2V7h2V6h2V5H3zm0 6h10V7h-2v1h-2v1H7V8H5V7H3v4z" />
            </svg>
            {profileData.email}
          </a>
          {onOpenContact ? (
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              style={{
                clipPath:
                  'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
              }}
              className="px-5 py-2.5 bg-[#262626] hover:bg-[#333] text-white text-xs font-bold border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all active:translate-x-px active:translate-y-px cursor-pointer"
            >
              Open Contact Form →
            </button>
          ) : (
            <a
              href={`mailto:${profileData.email}`}
              style={{
                clipPath:
                  'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
              }}
              className="px-5 py-2.5 bg-[#262626] hover:bg-[#333] text-white text-xs font-bold border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all active:translate-x-px active:translate-y-px"
            >
              Send Inquiry →
            </a>
          )}
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-white/5">
          {profileData.socials.map((social) => {
            const Icon =
              social.icon === 'github'
                ? GithubLogoIcon
                : social.icon === 'linkedin'
                ? LinkedinLogoIcon
                : TwitterLogoIcon;
            return (
              <a
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  clipPath:
                    'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
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
  );
};
