import profile from '@/data/profile.json';
import metaData from '@/data/meta.json';
import {
  Breadcrumb,
  ArticleData,
  buildPersonSchema,
  buildWebsiteAndProfileSchema,
  buildProjectsSchema,
} from './schemaGenerators';

export type { Breadcrumb, ArticleData };

interface JsonLdProps {
  breadcrumbs?: Breadcrumb[];
  article?: ArticleData;
}

export const JsonLd = ({ breadcrumbs, article }: JsonLdProps) => {
  const personId = `${metaData.site.url}/#person`;
  const websiteId = `${metaData.site.url}/#website`;
  const profilePageId = `${metaData.site.url}/#profilepage`;

  const personSchema = buildPersonSchema(personId);
  const [websiteSchema, profilePageSchema, serviceSchema] = buildWebsiteAndProfileSchema(websiteId, personId, profilePageId);
  const projectsSchema = buildProjectsSchema(personId);

  const breadcrumbSchema = breadcrumbs
    ? {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.item.startsWith('http') ? crumb.item : `${metaData.site.url}${crumb.item}`,
        })),
      }
    : null;

  const articleSchema = article
    ? {
        '@type': 'Article',
        headline: article.headline,
        description: article.description,
        image: article.image,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: { '@type': 'Person', name: article.authorName || profile.name, url: metaData.site.url },
        publisher: { '@id': personId },
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

  const fullSchema = { '@context': 'https://schema.org', '@graph': graph };
  const jsonLdContent = JSON.stringify(fullSchema).replaceAll('<', String.raw`\u003c`);

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdContent }} />;
};
