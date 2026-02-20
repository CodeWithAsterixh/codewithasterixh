import profile from "@/data/profile.json";
import metaData from "@/data/meta.json";

export const JsonLd = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${metaData.site.url}/#person`,
    name: profile.name,
    alternateName: profile.alias,
    jobTitle: profile.role,
    url: metaData.site.url,
    image: `${metaData.site.url}/images/me-cut-1.png`,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};
