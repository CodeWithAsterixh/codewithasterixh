import { BlogPostPage } from "@/features/blog/components/BlogPostPage";
import postsData from "@/data/posts.json";
import metaData from "@/data/meta.json";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = postsData.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Asterixh Blog`,
    description: post.excerpt.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 160),
      url: `/blog/${post.slug}`,
      type: "article",
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt.slice(0, 160),
      images: [post.image],
    }
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post: any = postsData.find((p) => p.slug === slug);

  if (!post) return null;

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${post.slug}` },
  ];

  const article = {
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `${metaData.site.url}${post.image}` : undefined,
    url: `${metaData.site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} article={article} />
      <BlogPostPage slug={slug} />
    </>
  );
}
