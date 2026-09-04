import profile from "@/data/profile.json";
import metaData from "@/data/meta.json";
import projects from "@/data/projects.json";

interface Breadcrumb {
  name: string;
  item: string;
}

interface JsonLdProps {
  breadcrumbs?: Breadcrumb[];
  article?: {
    headline: string;
    description: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
    url: string;
  };
}

export const JsonLd = ({ breadcrumbs, article }: JsonLdProps) => {
  const personId = `${metaData.site.url}/#person`;
  const websiteId = `${metaData.site.url}/#website`;
  const profilePageId = `${metaData.site.url}/#profilepage`;
  const serviceId = `${metaData.site.url}/#service`;

  const personSchema = {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: ["Asterixh", "CodeWithAsterixh", profile.alias],
    jobTitle: profile.role,
    headline: profile.headline,
    url: metaData.site.url,
    image: `${metaData.site.url}/images/me.png`,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    sameAs: profile.socials.map((s) => s.href),
    description: profile.subtext,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Fullstack Software Engineer",
      occupationLocation: {
        "@type": "AdministrativeArea",
        name: "Lagos, Nigeria",
      },
      skills: "Next.js, React, TypeScript, Node.js, Express.js, PostgreSQL, MongoDB, Redis, WebSockets, REST APIs, System Architecture",
    },
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Independent Software Engineering",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "WebSockets",
      "Server-Sent Events",
      "RESTful API Design",
      "Fullstack Web Development",
      "Frontend Architecture",
      "Backend Engineering",
      "System Architecture",
      "Web Performance Optimization",
      "PWA (Progressive Web Apps)",
    ],
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": websiteId,
    url: metaData.site.url,
    name: metaData.site.title,
    alternateName: metaData.site.shortTitle,
    description: metaData.site.description,
    publisher: {
      "@id": personId,
    },
    author: {
      "@id": personId,
    },
    inLanguage: "en-US",
  };

  const profilePageSchema = {
    "@type": "ProfilePage",
    "@id": profilePageId,
    url: metaData.site.url,
    name: metaData.site.title,
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": personId,
    },
    mainEntity: {
      "@id": personId,
    },
    description: metaData.site.description,
  };

  const serviceSchema = {
    "@type": "ProfessionalService",
    "@id": serviceId,
    name: `${profile.name} (${profile.alias}) - Software Engineering`,
    url: metaData.site.url,
    provider: {
      "@id": personId,
    },
    description: "Custom fullstack web development, frontend engineering, backend API design, and performance optimization services.",
    serviceType: [
      "Fullstack Web Development",
      "Frontend Web Engineering",
      "Backend API & Database Design",
      "System Architecture Consulting",
      "Real-Time Application Development",
      "Performance & SEO Optimization",
    ],
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Worldwide (Remote)",
    },
    knowsLanguage: ["English"],
  };

  const projectsSchema = {
    "@type": "ItemList",
    name: "Featured Software Projects",
    description: "Production web applications, tools, and systems created by Paul Peter (Asterixh).",
    itemListElement: projects.slice(0, 8).map((proj, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebApplication",
        name: proj.title,
        description: proj.excerpt,
        url: proj.url,
        applicationCategory: "WebApplication",
        browserRequirements: "Requires modern web browser with JavaScript enabled",
        creator: {
          "@id": personId,
        },
      },
    })),
  };

  const breadcrumbSchema = breadcrumbs
    ? {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.item.startsWith("http")
            ? crumb.item
            : `${metaData.site.url}${crumb.item}`,
        })),
      }
    : null;

  const articleSchema = article
    ? {
        "@type": "Article",
        headline: article.headline,
        description: article.description,
        image: article.image,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: {
          "@type": "Person",
          name: article.authorName || profile.name,
          url: metaData.site.url,
        },
        publisher: {
          "@id": personId,
        },
        url: article.url,
      }
    : null;

  const graph = [
    personSchema,
    websiteSchema,
    profilePageSchema,
    serviceSchema,
    projectsSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...(articleSchema ? [articleSchema] : []),
  ];

  const fullSchema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  const jsonLdContent = JSON.stringify(fullSchema).replaceAll('<', String.raw`\u003c`);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdContent }}
    />
  );
};
