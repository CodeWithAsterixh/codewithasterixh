import blogPosts from "@/data/posts.json";
import { notFound } from "next/navigation";
import React from "react";
import { BlogPostContent } from "./BlogPostContent/BlogPostContent";
import { BlogSidebar } from "./BlogSidebar/BlogSidebar";

interface BlogPostPageProps {
  slug: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  // Get recent posts for sidebar (excluding current one)
  const recentPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-12 md:pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Content */}
         <div className="col-span-1 lg:col-span-2">
            <BlogPostContent post={post} />
         </div>

         {/* Sidebar */}
         <div className="col-span-1">
            <div className="sticky top-24">
                <BlogSidebar recentPosts={recentPosts} />
            </div>
         </div>
      </div>
    </main>
  );
};
