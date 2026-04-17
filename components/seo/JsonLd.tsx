import profile from "@/data/profile.json";
import metaData from "@/data/meta.json";

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
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${metaData.site.url}/#person`,
    name: profile.name,
    alternateName: ["Asterixh", "Asterixh"],
    jobTitle: profile.role,
    url: metaData.site.url,
    image: `${metaData.site.url}/images/my-photo.png`,
    sameAs: profile.socials.map((s) => s.href),
    description: profile.about.content,
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    knowsAbout: [
      "Web Development",
      "Full Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Software Engineering",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${metaData.site.url}/#website`,
    url: metaData.site.url,
    name: metaData.site.title,
    description: metaData.site.description,
    publisher: {
      "@id": `${metaData.site.url}/#person`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${metaData.site.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = breadcrumbs
    ? {
        "@context": "https://schema.org",
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
        "@context": "https://schema.org",
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
        url: article.url,
      }
    : null;

  const jsonLdContentPersonsChema = JSON.stringify(personSchema).replaceAll('<', String.raw`\u003c`);


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdContentPersonsChema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </>
  );
};
