import { getSanityQuery } from "../../../../cms-studio/lib/getSanityQuery";
import { portfolioSectionQuery } from "../../../../cms-studio/queries";
import { Portfolio as PortfolioDataType } from "../../../../cms-studio/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import imageUrlBuilder from "../../../../lib/imageUrlBuilder";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const homeData: PortfolioDataType = (await getSanityQuery(portfolioSectionQuery))[0];
  const project = homeData.portfolioSection.projects.find(p => p._key === slug);

  if (!project) return {};

  const ogImageUrl = project.meta.ogImage?._type
    ? imageUrlBuilder([project.meta.ogImage], { width: 1200, height: 630, quality: 90 })[0]
    : null;

  return {
    title: project.meta.title,
    description: project.meta.description,
    keywords: project.meta.keywords,
    alternates: {
      canonical: project.meta.canonicalUrl,
    },
    openGraph: {
      title: project.meta.ogTitle,
      description: project.meta.ogDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.meta.twitterTitle,
      description: project.meta.twitterDescription,
      images: project.meta.twitterImage?._type ? [imageUrlBuilder([project.meta.twitterImage], { width: 1200, height: 600, quality: 90 })[0]] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  const homeData: PortfolioDataType = (await getSanityQuery(portfolioSectionQuery))[0];
  const project = homeData.portfolioSection.projects.find(p => p.slug.current === slug);

  if (!project) {
    notFound();
  }

  const thumbnailImg = project.thumbnail._type
    ? imageUrlBuilder([project.thumbnail], { width: 1024, height: 576, quality: 90 })[0]
    : null;

  return (
    <main className="min-h-screen pt-20">
      <article className="w-full py-20 bg-base-100">
        <div className="section_container px-4 max-w-4xl mx-auto">
          <header className="mb-8">
            <Link href="/projects" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Projects
            </Link>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-accent-content/80 text-lg mb-6">{project.excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx+1}
                  className="text-sm px-3 py-1 bg-primary-content text-base-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx+1}
                  className="text-sm px-3 py-1 border border-base-300 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </header>

          {thumbnailImg && (
            <div className="relative w-full h-96 mb-8">
              <Image
                fill
                src={thumbnailImg}
                alt={project.title}
                className="object-cover rounded-lg"
              />
            </div>
          )}

          <section className="prose prose-lg max-w-none">
            {/* Assuming project has content, but from schema it's excerpt. For full content, might need to add to schema */}
            {/* <p>{project.excerpt}</p> */}
            {/* Add more content if available */}
          </section>

          {project.url && (
            <div className="mt-8">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-base-300 py-3 px-6 rounded-full hover:bg-primary-focus transition-colors"
              >
                View Live Project
              </a>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}