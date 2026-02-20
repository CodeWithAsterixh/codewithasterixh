import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import profileData from "@/data/profile.json";

interface ProfileCardProps {
  titleAs?: "h1" | "h2";
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ titleAs = "h2" }) => {
  return (
    <Card className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 h-full group">
      <div className="relative w-full md:w-1/3 aspect-square rounded-tl-[30px] rounded-br-[30px] overflow-hidden bg-linear-to-br from-blue-500 to-indigo-600">
         <Image 
            src={profileData.images.hero.src} 
            alt={profileData.images.hero.alt}
            fill
            className="object-cover" 
         />
      </div>
      
      <div className="flex flex-col justify-center flex-1 gap-2">
        <Text variant="caption" color="gray">{profileData.role}</Text>
        <Text variant="h2" as={titleAs} weight="medium" color="white">{profileData.name}.</Text>
        <Text variant="body" color="gray" className="max-w-xs">
          {profileData.subtext}
        </Text>
      </div>

      <div className="absolute bottom-6 right-6">
        <ArrowButton href="/about" />
      </div>
    </Card>
  );
};
