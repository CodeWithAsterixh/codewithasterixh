import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { StarFour } from "@phosphor-icons/react/dist/ssr";
import profileData from "@/data/profile.json";
import uiData from "@/data/ui.json";

export const AboutHero: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Left: Image Card */}
      <Card className="col-span-1 p-4 bg-[#1a1a1a]">
        <div className="relative w-full aspect-square min-h-full rounded-[30px] overflow-hidden bg-linear-to-b from-blue-400 to-blue-600">
             <Image 
                src={profileData.images.about.src} 
                alt={profileData.images.about.alt} 
                fill 
                className="object-cover"
             />
        </div>
      </Card>

      {/* Right: Self Summary */}
      <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
        <div className="flex items-center justify-center gap-4 py-2">
            <StarFour size={40} weight="fill" className="text-white" />
            <Text variant="h1" weight="medium" className="uppercase tracking-wide">{uiData.about.hero.title}</Text>
            <StarFour size={40} weight="fill" className="text-white" />
        </div>
        
        <Card className="flex-1 p-8 md:p-12 bg-[#1a1a1a] relative overflow-hidden">
            <div className="absolute top-0 left-8">
                <StarFour size={48} weight="light" className="text-white/20" />
            </div>
            
            <div className="mt-8">
                <Text variant="h2" weight="medium" className="mb-4">{profileData.name} ({profileData.alias})</Text>
                <Text variant="body" color="gray" className="max-w-2xl leading-relaxed whitespace-pre-wrap">
                    {profileData.about.content}
                </Text>
            </div>
        </Card>
      </div>
    </div>
  );
};
