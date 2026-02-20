import { ProjectPage } from "@/features/works/components/ProjectPage/ProjectPage";
import projectsData from "@/data/projects.json";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

  return {
    title: `${project.title} | Asterixh Works`,
    description: project.excerpt.slice(0, 160),
    openGraph: {
        title: project.title,
        description: project.excerpt.slice(0, 160),
        images: project.thumbnail ? [project.thumbnail] : [],
    }
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectPage slug={slug} />;
}
