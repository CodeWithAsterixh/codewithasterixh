import React from "react";
import Image from "next/image";
import { Text } from "@/components/ui/atoms/Text/Text";
import { BlogPostProps } from "../../types/blog";
import { StarFourIcon } from "@phosphor-icons/react/dist/ssr";
import uiData from "@/data/ui.json";

export const BlogPostContent: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="mb-8">
         <Text variant="caption" color="gray" className="uppercase mb-2 text-sm tracking-wider">
            {uiData.common.breadcrumbs.home} - {post.title}
         </Text>
         
         <div className="flex items-center gap-2 mb-8">
            <StarFourIcon size={24} weight="fill" className="text-white/30" />
            <Text variant="h1" weight="bold" className="uppercase text-2xl! md:text-3xl! text-white leading-tight">
                {post.title}
            </Text>
            <StarFourIcon size={24} weight="fill" className="text-white/30" />
         </div>

         {/* Featured Image */}
         <div className="relative w-full aspect-video rounded-[30px] overflow-hidden mb-8">
             {/* Using a placeholder image if the actual one fails or is missing, but for now assuming it works or shows blank */}
             <div className="absolute inset-0 left-0 flex items-center justify-start">
                <Image 
                    src={post.image} 
                    alt={post.title}
                    width={800}
                    height={450}
                    className="object-contain max-h-[80%]" 
                />
             </div>
         </div>

         {/* Meta */}
         <Text variant="caption" color="gray" className="text-primary-blue mb-8 font-medium">
            {post.date} - {post.category}
         </Text>

         {/* Content */}
         <div 
            className="prose prose-invert prose-lg max-w-none text-gray-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
         />
         
         {/* Tags */}
         <div className="flex gap-2 mt-8">
            {post.tags.map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-[#1a1a1a] rounded-lg text-xs font-medium text-gray-400 uppercase tracking-wider hover:text-white transition-colors cursor-pointer">
                    {tag}
                </span>
            ))}
         </div>
      </div>
    </div>
  );
};
