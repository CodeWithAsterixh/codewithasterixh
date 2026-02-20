"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { Button } from "@/components/ui/atoms/Button/Button";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { BlogPost } from "../../types/blog";
import Link from "next/link";
import uiData from "@/data/ui.json";
import { useRouter } from "next/navigation";

interface BlogSidebarProps {
  recentPosts: BlogPost[];
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({ recentPosts }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <Card className="p-6 md:p-8">
        <Text variant="caption" color="gray" className="uppercase mb-4">{uiData.blog.sidebar.search.title}</Text>
        <div className="relative">
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={uiData.blog.sidebar.search.placeholder}
                className="w-full bg-white/10 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none placeholder-white/50 border border-white/10"
            />
            <div className="absolute top-1 right-1 bottom-1">
                <Button onClick={handleSearch} variant="primary" className="h-full aspect-square flex items-center justify-center bg-primary-blue hover:bg-[#4a8cd8] rounded-md text-white p-0">
                    <MagnifyingGlass size={20} weight="bold" />
                </Button>
            </div>
        </div>
      </Card>

      {/* Recent Posts */}
      <Card className="p-6 md:p-8">
        <Text variant="h4" weight="medium" className="mb-6 text-white">{uiData.blog.sidebar.recentPosts.title}</Text>
        <div className="flex flex-col gap-4">
            {recentPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <Text variant="body" color="gray" className="group-hover:text-white transition-colors text-sm border-b border-white/10 pb-4 last:border-0 last:pb-0">
                        {post.title}
                    </Text>
                </Link>
            ))}
        </div>
      </Card>

      {/* Recent Comments */}
      {/* <Card className="p-6 md:p-8">
        <Text variant="h4" weight="medium" className="mb-6 text-white">{uiData.blog.sidebar.recentComments.title}</Text>
        <Text variant="body" color="gray" className="text-sm opacity-60">{uiData.blog.sidebar.recentComments.empty}</Text>
      </Card> */}

      {/* Archives */}
      {/* <Card className="p-6 md:p-8">
        <Text variant="h4" weight="medium" className="mb-6 text-white">{uiData.blog.sidebar.archives.title}</Text>
        <div className="flex flex-col gap-2">
            {uiData.blog.sidebar.archives.items.map((item, index) => (
                <Link key={index} href="#" className="group">
                    <Text variant="body" color="gray" className="group-hover:text-white transition-colors text-sm">
                        {item}
                    </Text>
                </Link>
            ))}
        </div>
      </Card> */}

      {/* Categories */}
      {/* <Card className="p-6 md:p-8">
        <Text variant="h4" weight="medium" className="mb-6 text-white">{uiData.blog.sidebar.categories.title}</Text>
        <div className="flex flex-col gap-2">
            {uiData.blog.sidebar.categories.items.map((item, index) => (
                <Link key={index} href="#" className="group">
                    <Text variant="body" color="gray" className="group-hover:text-white transition-colors text-sm">
                        {item}
                    </Text>
                </Link>
            ))}
        </div>
      </Card> */}
    </div>
  );
};
