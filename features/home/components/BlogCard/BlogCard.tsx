import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import Image from "next/image";
import uiData from "@/data/ui.json";

export const BlogCard: React.FC = () => {
  return (
    <Card className="h-full flex flex-col justify-between group">
      <div className="flex-1 flex items-center justify-center mb-6">
         <Image src="/globe.svg" width={80} height={80} alt="Blog" className="opacity-50 group-hover:scale-110 transition-transform" />
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <Text variant="caption" color="gray" className="mb-1">{uiData.home.blogCard.subtitle}</Text>
          <Text variant="h4" weight="medium">{uiData.home.blogCard.title}</Text>
        </div>
        <ArrowButton href="/blog" />
      </div>
    </Card>
  );
};
