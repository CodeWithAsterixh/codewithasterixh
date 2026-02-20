import React from "react";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ProfileSidebar } from "./ProfileSidebar/ProfileSidebar";
import { CredentialItem } from "./CredentialItem/CredentialItem";
import { SkillsList } from "./SkillsList/SkillsList";
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import educationData from "@/data/education.json";
import uiData from "@/data/ui.json";

export const Credentials: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-12 md:pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 items-start">
         {/* Left Column: Sidebar */}
         <div className="col-span-1 lg:sticky lg:top-24">
            <ProfileSidebar nameAs="h1" />
         </div>

         {/* Right Column: Content */}
         <div className="col-span-1 lg:col-span-2 flex flex-col gap-16">
            
            {/* About Me */}
            <div>
                <Text variant="h4" weight="medium" className="uppercase mb-8 text-white">{uiData.credentials.about.title}</Text>
                <Text variant="body" color="gray" className="leading-relaxed mb-8 whitespace-pre-wrap">
                    {profileData.about.content}
                </Text>
            </div>

            {/* Experience */}
            <div>
                <Text variant="h4" weight="medium" className="uppercase mb-8 text-white">{uiData.credentials.experience.title}</Text>
                {experienceData.map((item, index) => (
                    <CredentialItem 
                        key={index}
                        period={`${item.duration.from} - ${item.duration.to}`}
                        title={item.title}
                        subtitle={item.name}
                        description="" 
                        highlight={index === 0}
                    />
                ))}
            </div>

            {/* Education */}
            <div>
                <Text variant="h4" weight="medium" className="uppercase mb-8 text-white">{uiData.credentials.education.title}</Text>
                {educationData.map((item, index) => (
                    <CredentialItem 
                        key={index}
                        period={`${item.duration.from} - ${item.duration.to}`}
                        title={item.title}
                        subtitle={item.name}
                        description=""
                        highlight={index === 0}
                    />
                ))}
            </div>

            {/* Skills & Awards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <SkillsList />
                {/* AwardsList hidden as no data available */}
                {/* <AwardsList /> */}
            </div>

         </div>
      </div>
    </main>
  );
};
