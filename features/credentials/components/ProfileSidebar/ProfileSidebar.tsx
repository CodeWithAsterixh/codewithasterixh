import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { Button } from "@/components/ui/atoms/Button/Button";
import { IconBox } from "@/components/ui/atoms/IconBox/IconBox";
import { GithubLogo, LinkedinLogo, TwitterLogo, DribbbleLogo, Globe } from "@phosphor-icons/react/dist/ssr";
import profileData from "@/data/profile.json";
import uiData from "@/data/ui.json";
import { Icon } from "@phosphor-icons/react";

const iconMap: Record<string, Icon> = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  twitter: TwitterLogo,
  dribbble: DribbbleLogo,
  website: Globe
};

interface ProfileSidebarProps {
  nameAs?: "h1" | "h2" | "h3";
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ nameAs = "h3" }) => {
  return (
    <Card className="sticky top-24 p-6 md:p-8 flex flex-col items-center text-center gap-6">
      <div className="relative w-full aspect-square rounded-[30px] overflow-hidden bg-white/5 mb-2 border border-white/10">
         <Image 
            src={profileData.images.hero.src} 
            alt={profileData.images.hero.alt}
            fill
            className="object-cover"
         />
      </div>
      
      <div className="flex flex-col gap-1">
        <Text variant="h3" as={nameAs} weight="bold" className="text-white">{profileData.name}</Text>
        <Text variant="body" color="gray">{profileData.handle}</Text>
      </div>

      <div className="flex items-center gap-3 justify-center">
         {profileData.socials.map((social, index) => {
            const Icon = iconMap[social.icon.toLowerCase()] || Globe;
            return (
               <a key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                 <IconBox icon={Icon} className="w-10 h-10 rounded-full bg-white/5 text-white hover:bg-white hover:text-black transition-colors cursor-pointer border border-white/10" />
               </a>
            );
         })}
      </div>

      <Button href="/contact" variant="primary" size="lg" className="w-full py-3 bg-accent hover:bg-white hover:text-black uppercase tracking-wider text-sm font-medium">
        {uiData.credentials.sidebar.contactButton}
      </Button>
    </Card>
  );
};
