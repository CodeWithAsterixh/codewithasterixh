import { ProjectPage } from "@/features/works/components/ProjectPage/ProjectPage";
import projectsData from "@/data/projects.json";
import metaData from "@/data/meta.json";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type ProjectRecord = (typeof projectsData)[number];

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} | Software Engineering Case Study | Asterixh`;
  const description = project.excerpt.slice(0, 155);

  return {
    title,
    description,
    keywords: [
      project.title,
      project.category,
      ...project.tags,
      ...project.tools,
      "Software Engineering Case Study",
      "Fullstack Implementation"
    ],
    openGraph: {
      title,
      description,
      url: `/works/${project.slug}`,
      type: "article",
      images: [{ url: `/images/og-images/og-project-${project.slug}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/images/og-images/og-project-${project.slug}.png`],
    }
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project: ProjectRecord | undefined = projectsData.find((p) => p.slug === slug);

  if (!project) return null;

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Works", item: "/works" },
    { name: project.title, item: `/works/${project.slug}` },
  ];

  const article = {
    headline: project.title,
    description: project.excerpt,
    image: project.thumbnail ? `${metaData.site.url}${project.thumbnail}` : undefined,
    url: `${metaData.site.url}/works/${project.slug}`,
  };

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} article={article} />
      <ProjectPage slug={slug} />
    </>
  );
}
