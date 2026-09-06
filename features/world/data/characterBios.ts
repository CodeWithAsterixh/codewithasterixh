import { CharacterId } from '../types';

export interface CharacterBio {
  role: string;
  desc: string;
  trait: string;
}

export const CHARACTER_BIOS: Record<CharacterId, CharacterBio> = {
  Fighter: {
    role: 'Fullstack Engineer',
    desc: 'Builds end-to-end web apps with TypeScript, React, and Node.js.',
    trait: 'Full-Stack',
  },
  Samurai: {
    role: 'System Architect',
    desc: 'Designs modular software, robust databases, and scalable cloud systems.',
    trait: 'Architecture',
  },
  Shinobi: {
    role: 'Backend Specialist',
    desc: 'Optimizes microservices, real-time networking, and high-speed APIs.',
    trait: 'APIs & Data',
  },
  Xavier: {
    role: 'DevSecOps & Platform',
    desc: 'Secures infrastructure, enforces cryptographic protocols, and hardening.',
    trait: 'Security & Cloud',
  },
  Countess_claire: {
    role: 'Frontend Architect',
    desc: 'Crafts responsive interfaces, interactive canvas engines, and UI systems.',
    trait: 'Frontend & UI',
  },
  bridget: {
    role: 'Creative Developer',
    desc: 'Designs engaging web experiences, fluid animations, and visual storytelling.',
    trait: 'Creative & UX',
  },
};
