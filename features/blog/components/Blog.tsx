/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogList } from "./BlogList/BlogList";
import blogPosts from "@/data/posts.json";
import { Text } from "@/components/ui/atoms/Text/Text";
import { Button } from "@/components/ui/atoms/Button/Button";
import { StarFour, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import uiData from "@/data/ui.json";

interface BlogProps {
  query?: string;
}

export const Blog: React.FC<BlogProps> = ({ query }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query || "");

  // Update search query when URL param changes
  useEffect(() => {
    setSearchQuery(query || "");
  }, [query]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/blog");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredPosts = query 
    ? blogPosts.filter((post) => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : blogPosts;

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-12 md:pt-24">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-16">
         <div className="flex items-center gap-4 mb-4">
            <StarFour size={32} weight="fill" className="text-white/30" />
            <Text variant="h1" weight="bold" className="uppercase tracking-wide text-5xl md:text-7xl text-white">{uiData.blog.hero.title}</Text>
            <StarFour size={32} weight="fill" className="text-white/30" />
         </div>
         <Text variant="body" color="gray" className="text-center max-w-2xl mb-12">
            {uiData.blog.hero.description}
         </Text>

         {/* Search Bar */}
         <div className="relative w-full max-w-xl">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative flex items-center bg-[#0a0a0a] rounded-lg p-1 border border-white/10">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for articles, topics, or keywords..."
                        className="w-full bg-transparent px-4 py-3 text-white focus:outline-none placeholder-white/30"
                    />
                    <Button 
                        onClick={handleSearch} 
                        variant="primary" 
                        className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-md aspect-square flex items-center justify-center min-w-[44px]"
                    >
                        <MagnifyingGlass size={20} weight="bold" />
                    </Button>
                </div>
            </div>
         </div>
      </div>

      {query && (
        <div className="mb-12 flex flex-col items-center gap-4">
            <Text variant="h4" className="text-white">
                Found {filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""} for &quot;<span className="text-primary-blue">{query}</span>&quot;
            </Text>
            {filteredPosts.length === 0 && (
                <Button 
                    onClick={() => {
                        setSearchQuery("");
                        router.push("/blog");
                    }}
                    variant="outline"
                    className="mt-2"
                >
                    Clear Search
                </Button>
            )}
        </div>
      )}

      {filteredPosts.length > 0 ? (
        <BlogList posts={filteredPosts} />
      ) : (
        null
      )}
    </main>
  );
};
