import profile from '@/data/profile.json';
import metaData from '@/data/meta.json';
import projects from '@/data/projects.json';

export interface Breadcrumb {
  name: string;
  item: string;
}

export interface ArticleData {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  url: string;
}

export function buildPersonSchema(personId: string) {
  return {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    alternateName: ['Asterixh', 'CodeWithAsterixh', profile.alias],
    jobTitle: profile.role,
    headline: profile.headline,
    url: metaData.site.url,
    image: `${metaData.site.url}/images/me.png`,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    sameAs: profile.socials.map((s) => s.href),
    description: profile.subtext,
    address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Fullstack Software Engineer',
      occupationLocation: { '@type': 'AdministrativeArea', name: 'Lagos, Nigeria' },
      skills: 'Next.js, React, TypeScript, Node.js, Express.js, PostgreSQL, MongoDB, Redis, WebSockets, REST APIs, System Architecture',
    },
    worksFor: { '@type': 'Organization', name: 'Freelance / Independent Software Engineering' },
    knowsAbout: [
      'Next.js', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js',
      'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Redis', 'WebSockets',
      'Server-Sent Events', 'RESTful API Design', 'Fullstack Web Development',
      'Frontend Architecture', 'Backend Engineering', 'System Architecture',
      'Web Performance Optimization', 'PWA (Progressive Web Apps)',
    ],
  };
}

export function buildWebsiteAndProfileSchema(websiteId: string, personId: string, profilePageId: string) {
  return [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: metaData.site.url,
      name: metaData.site.title,
      alternateName: metaData.site.shortTitle,
      description: metaData.site.description,
      publisher: { '@id': personId },
      author: { '@id': personId },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfilePage',
      '@id': profilePageId,
      url: metaData.site.url,
      name: metaData.site.title,
      isPartOf: { '@id': websiteId },
      about: { '@id': personId },
      mainEntity: { '@id': personId },
      description: metaData.site.description,
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${metaData.site.url}/#service`,
      name: `${profile.name} (${profile.alias}) - Software Engineering`,
      url: metaData.site.url,
      provider: { '@id': personId },
      description: 'Custom fullstack web development, frontend engineering, backend API design, and performance optimization services.',
      serviceType: [
        'Fullstack Web Development', 'Frontend Web Engineering',
        'Backend API & Database Design', 'System Architecture Consulting',
        'Real-Time Application Development', 'Performance & SEO Optimization',
      ],
      areaServed: { '@type': 'AdministrativeArea', name: 'Worldwide (Remote)' },
      knowsLanguage: ['English'],
    },
  ];
}

export function buildProjectsSchema(personId: string) {
  return {
    '@type': 'ItemList',
    name: 'Featured Software Projects',
    description: 'Production web applications, tools, and systems created by Paul Peter (Asterixh).',
    itemListElement: projects.slice(0, 8).map((proj, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebApplication',
        name: proj.title,
        description: proj.excerpt,
        url: proj.url,
        applicationCategory: 'WebApplication',
        browserRequirements: 'Requires modern web browser with JavaScript enabled',
        creator: { '@id': personId },
      },
    })),
  };
}
