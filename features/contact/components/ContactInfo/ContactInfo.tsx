import React from "react";
import Link from "next/link";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ContactItem } from "./ContactItem";
import { 
  Envelope, 
  Phone, 
  MapPin, 
  GithubLogo, 
  LinkedinLogo, 
  TwitterLogo,
  InstagramLogo,
  DribbbleLogo,
  Globe
} from "@phosphor-icons/react/dist/ssr";
import { IconBox } from "@/components/ui/atoms/IconBox/IconBox";
import profileData from "@/data/profile.json";
import uiData from "@/data/ui.json";
import { Icon } from "@phosphor-icons/react";

const socialIconMap: Record<string, Icon> = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  twitter: TwitterLogo,
  instagram: InstagramLogo,
  dribbble: DribbbleLogo,
  website: Globe
};

export const ContactInfo: React.FC = () => {
  return (
    <div className="flex flex-col">
        <Text variant="h4" weight="medium" className="uppercase mb-8">{uiData.contact.info.title}</Text>
        
        <div className="mb-12 flex flex-col gap-8">
            <ContactItem 
                icon={Envelope} 
                title={uiData.contact.info.mail} 
                details={[profileData.email]} 
            />
            <ContactItem 
                icon={Phone} 
                title={uiData.contact.info.contact} 
                details={[profileData.phone]} 
            />
            <ContactItem 
                icon={MapPin} 
                title={uiData.contact.info.location} 
                details={[profileData.location]} 
            />
        </div>

        <Text variant="h4" weight="medium" className="uppercase mb-6">{uiData.contact.info.socialsTitle}</Text>
        <div className="flex items-center gap-4">
            {profileData.socials.map((social, index) => {
                const Icon = socialIconMap[social.icon.toLowerCase()] || Globe;
                return (
                    <Link 
                        key={index} 
                        href={social.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <IconBox 
                            icon={Icon} 
                            className="w-16 h-16 rounded-full text-white group-hover:bg-white group-hover:text-black transition-colors cursor-pointer" 
                        />
                    </Link>
                );
            })}
        </div>
    </div>
  );
};
