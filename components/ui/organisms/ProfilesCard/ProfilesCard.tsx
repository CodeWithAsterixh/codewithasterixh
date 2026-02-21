import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import { GithubLogoIcon, LinkedinLogoIcon, TwitterLogoIcon, DribbbleLogoIcon, GlobeIcon } from "@phosphor-icons/react/dist/ssr";
import profileData from "@/data/profile.json";
import uiData from "@/data/ui.json";
import { Icon } from "@phosphor-icons/react";

const iconMap: Record<string, Icon> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  twitter: TwitterLogoIcon,
  dribbble: DribbbleLogoIcon,
  website: GlobeIcon
};

export const ProfilesCard: React.FC = () => {
  return (
    <Card className="h-full flex flex-col justify-between group">
      <div className="flex-1 flex items-center justify-center gap-4 mb-6 p-4 rounded-[30px] border border-white/5 bg-[#1a1a1a]">
         {profileData.socials.map((social, index) => {
            const Icon = iconMap[social.icon.toLowerCase()] || GlobeIcon;
            return (
               <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <Icon size={32} weight="fill" />
               </a>
            );
         })}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <Text variant="caption" color="gray" className="mb-1">{uiData.common.profilesCard.subtitle}</Text>
          <Text variant="h4" weight="medium">{uiData.common.profilesCard.title}</Text>
        </div>
        <ArrowButton href="/contact" />
      </div>
    </Card>
  );
};
