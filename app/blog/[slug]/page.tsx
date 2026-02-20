import { BlogPostPage } from "@/features/blog/components/BlogPostPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
