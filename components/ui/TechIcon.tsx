'use client';

import React from 'react';
import StackIcon, { IconName } from 'tech-stack-icons';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
  variant?: 'light' | 'dark' | 'grayscale';
}

// Direct mappings from tech-stack.json icon keys to tech-stack-icons IconName
const STACK_ICON_MAP: Record<string, IconName> = {
  nextjs: 'nextjs2',
  'next.js': 'nextjs2',
  next: 'nextjs2',
  react: 'react',
  reactjs: 'react',
  typescript: 'typescript',
  ts: 'typescript',
  nodejs: 'nodejs',
  node: 'nodejs',
  mongodb: 'mongodb',
  mongo: 'mongodb',
  supabase: 'supabase',
  postgres: 'postgresql',
  postgresql: 'postgresql',
  redis: 'redis',
  python: 'python',
  fastapi: 'fastapi',
  tailwindcss: 'tailwindcss',
  tailwind: 'tailwindcss',
  gsap: 'gsap',
  framer: 'framer',
  framermotion: 'framer',
  shadcnui: 'shadcnui',
  shadcn: 'shadcnui',
  figma: 'figma',
  git: 'git',
  postman: 'postman',
  pwa: 'pwa',
};

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = 'w-5 h-5',
  size,
  variant,
}) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const iconKey = name.toLowerCase().trim();
  const stackIconName = STACK_ICON_MAP[iconKey];

  if (stackIconName) {
    return (
      <figure
        role="img"
        aria-label={`${name} icon`}
        suppressHydrationWarning
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={size ? { width: size, height: size } : undefined}
      >
        {mounted ? (
          <StackIcon
            name={stackIconName}
            variant={variant}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="w-full h-full inline-block" />
        )}
      </figure>
    );
  }

  // Specialized skill vector illustrations for custom conceptual architecture skills
  const style = size ? { width: size, height: size } : undefined;

  switch (iconKey) {
    // WebSockets & SSE (Full-Duplex Bidirectional Streams SVG Illustration)
    case 'websocket':
    case 'websockets':
    case 'sse':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 17l6-6-6-6" />
          <path d="M12 19h8" />
          <path d="M20 7l-6 6 6 6" />
          <path d="M4 5h8" />
        </svg>
      );

    // Responsive Design (Multi-device viewport matrix: Desktop + Tablet + Mobile)
    case 'responsive':
    case 'responsivedesign':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <rect x="14" y="9" width="6" height="10" rx="1" fill="currentColor" fillOpacity="0.15" />
          <circle cx="17" cy="17" r="0.5" fill="currentColor" />
        </svg>
      );

    // System Architecture (Microservices Topology & Distributed Nodes)
    case 'architecture':
    case 'systemarchitecture':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="6" height="6" rx="1" />
          <rect x="16" y="2" width="6" height="6" rx="1" />
          <rect x="9" y="16" width="6" height="6" rx="1" />
          <path d="M5 8v3a2 2 0 002 2h10a2 2 0 002-2V8" />
          <path d="M12 13v3" />
        </svg>
      );

    // API Design (REST Endpoints & Request/Response Handshake)
    case 'api':
    case 'apidesign':
    case 'rest':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9h16" />
          <path d="M4 15h16" />
          <path d="M10 3L8 21" />
          <path d="M16 3l-2 18" />
          <circle cx="4" cy="9" r="1.5" fill="currentColor" />
          <circle cx="20" cy="15" r="1.5" fill="currentColor" />
        </svg>
      );

    // E2E Encryption (Asymmetric Keypair & Cipher Payload Lock)
    case 'security':
    case 'encryption':
    case 'e2e':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          <path d="M12 17.5v2" />
        </svg>
      );

    // Technical Documentation (Markdown Schema & API Reference Spec)
    case 'docs':
    case 'documentation':
    case 'technicaldocumentation':
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      );
  }
};
