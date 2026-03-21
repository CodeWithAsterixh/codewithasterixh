"use client"
import React, { useState } from "react";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ProfileSidebar } from "./ProfileSidebar/ProfileSidebar";
import { CredentialItem } from "./CredentialItem/CredentialItem";
import { SkillsList } from "./SkillsList/SkillsList";
import { Modal } from "@/components/ui/atoms/Modal/Modal";
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import educationData from "@/data/education.json";
import uiData from "@/data/ui.json";

interface SelectionItem {
  duration: { from: number; to: number };
  name: string;
  title?: string;
  description: string;
  role?: string;
  workType?: string;
  stacks?: string[];
  achievements?: string[];
}

export const Credentials: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<SelectionItem | null>(null);

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
                        title={item.role || ""}
                        subtitle={item.name}
                        description={item.description} 
                        highlight={index === 0}
                        onClick={() => setSelectedItem(item)}
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
                        description={item.description}
                        highlight={index === 0}
                        onClick={() => setSelectedItem(item)}
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

      <Modal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        title={selectedItem?.name || ""}
      >
        <div className="flex flex-col gap-8">
          {/* Header Info */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Text variant="caption" color="gray">
                {selectedItem?.duration.from} - {selectedItem?.duration.to}
              </Text>
              {selectedItem?.workType && (
                <span className="px-3 py-1 rounded-full bg-primary-blue/10 text-primary-blue text-xs font-medium">
                  {selectedItem.workType}
                </span>
              )}
            </div>
            <Text variant="h3" weight="semibold" className="text-white">
              {selectedItem?.role || selectedItem?.title}
            </Text>
            <Text variant="body" color="gray" className="text-sm">
              {selectedItem?.name}
            </Text>
          </div>
          
          <div className="h-px bg-white/5 w-full" />
          
          {/* Description */}
          <div className="flex flex-col gap-3">
            <Text variant="caption" weight="medium" className="uppercase text-white/50 tracking-wider">Description</Text>
            <Text variant="body" color="gray" className="leading-relaxed whitespace-pre-wrap">
              {selectedItem?.description}
            </Text>
          </div>

          {/* Achievements */}
          {selectedItem?.achievements && selectedItem.achievements.length > 0 && (
            <div className="flex flex-col gap-3">
              <Text variant="caption" weight="medium" className="uppercase text-white/50 tracking-wider">Key Achievements</Text>
              <ul className="flex flex-col gap-3">
                {selectedItem.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-blue shrink-0" />
                    <Text variant="body" color="gray" className="text-[15px] leading-relaxed">
                      {achievement}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {selectedItem?.stacks && selectedItem.stacks.length > 0 && (
            <div className="flex flex-col gap-3">
              <Text variant="caption" weight="medium" className="uppercase text-white/50 tracking-wider">Tech Stack</Text>
              <div className="flex flex-wrap gap-2">
                {selectedItem.stacks.map((stack, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs">
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </main>
  );
};
