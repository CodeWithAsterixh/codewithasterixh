export interface InteractiveWorldObject {
  id: string;
  name: string;
  category: 'project' | 'secret' | 'lore';
  image: string;
  x: number;
  yOffset?: number;
  size: number;
  projectSlug: string;
  projectTitle: string;
  shortDesc: string;
  actionLabel: string;
  glowColor: string;
}

export const INTERACTIVE_OBJECTS: InteractiveWorldObject[] = [
  {
    id: 'obj_quizeen',
    name: 'Quizeen',
    category: 'project',
    image: '/objects/chest.png',
    x: -2800,
    size: 140,
    projectSlug: 'quizeen-interactive-quiz-platform',
    projectTitle: 'Quizeen – Quiz Platform',
    shortDesc: 'Assessment platform built with Next.js, Redux, and MongoDB.',
    actionLabel: 'Inspect Quizeen',
    glowColor: '#eab308',
  },
  {
    id: 'obj_workup',
    name: 'WorkUp',
    category: 'project',
    image: '/objects/briefcase.png',
    x: -1600,
    size: 140,
    projectSlug: 'workup-cards-business-card-generator',
    projectTitle: 'WorkUp – Business Card Maker',
    shortDesc: 'Card generator with real-time canvas preview and templates.',
    actionLabel: 'Inspect WorkUp',
    glowColor: '#ec4899',
  },
  {
    id: 'obj_anonfly',
    name: 'AnonFly',
    category: 'project',
    image: '/objects/vault-case.png',
    x: -800,
    size: 140,
    projectSlug: 'anonfly-anonymous-encrypted-messaging',
    projectTitle: 'AnonFly – Encrypted Messaging',
    shortDesc: 'Anonymous messaging platform with cryptographic security.',
    actionLabel: 'Inspect AnonFly',
    glowColor: '#10b981',
  },
  {
    id: 'obj_worldtimesage',
    name: 'WorldTimeSage',
    category: 'project',
    image: '/objects/hyperbolic-chamber.png',
    x: 800,
    size: 155,
    projectSlug: 'worldtimesage',
    projectTitle: 'WorldTimeSage – Timezone Converter',
    shortDesc: 'Multi-timezone conversion, daylight calculation & scheduler.',
    actionLabel: 'Inspect WorldTimeSage',
    glowColor: '#f59e0b',
  },
  {
    id: 'obj_sms',
    name: 'School Portal',
    category: 'project',
    image: '/objects/vault-bag.png',
    x: 1800,
    size: 140,
    projectSlug: 'sms-comprehensive-school-management',
    projectTitle: 'SMS – School Management System',
    shortDesc: 'Institutional portal managing grades, attendance, and records.',
    actionLabel: 'Inspect School Portal',
    glowColor: '#06b6d4',
  },
  {
    id: 'obj_astermail',
    name: 'AsterMail',
    category: 'project',
    image: '/objects/bag.png',
    x: 3200,
    size: 140,
    projectSlug: 'astermail',
    projectTitle: 'AsterMail – Email System',
    shortDesc: 'Email client and campaign delivery system.',
    actionLabel: 'Inspect AsterMail',
    glowColor: '#3b82f6',
  },
];

export function getNearbyWorldObject(playerX: number, interactionRadius: number = 110): InteractiveWorldObject | null {
  for (const obj of INTERACTIVE_OBJECTS) {
    if (Math.abs(playerX - obj.x) <= interactionRadius) {
      return obj;
    }
  }
  return null;
}
