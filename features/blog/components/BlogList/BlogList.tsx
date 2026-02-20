import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import { BlogListProps } from "../../types/blog";

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Card key={post.id} className="group p-6 flex flex-col justify-between bg-[#1a1a1a] h-full">
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-[#2a2a2a] mb-6">
                <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                </div>
                
                <Link href={`/blog/${post.slug}`} className="block">
                    <Text variant="h4" weight="medium" className="text-white text-xl line-clamp-2 hover:text-primary-blue transition-colors">
                        {post.title}
                    </Text>
                </Link>
                
                <div className="flex items-end justify-between mt-auto pt-4">
                    <ArrowButton href={`/blog/${post.slug}`} />
                </div>
            </div>
        </Card>
      ))}
    </div>
  );
};
