"use client"
import React, { useState } from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ExperienceCardProps, TimelineItem } from "./ExperienceCard.types";
import { Modal } from "@/components/ui/atoms/Modal/Modal";

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, items, className }) => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  return (
    <>
      <Card className={`p-8 md:p-10 ${className}`}>
        <Text variant="h4" weight="medium" className="uppercase mb-8">{title}</Text>
        
        <div className="flex flex-col gap-8">
          {items.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col gap-1 border-b border-white/5 pb-8 last:border-0 last:pb-0 cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                  <Text variant="body" color="gray" className="mb-1">{item.period}</Text>
                  <Text variant="h4" weight="medium" color="white" className="group-hover:text-primary-blue transition-colors">{item.title}</Text>
                  <Text variant="caption" color="gray" className="normal-case tracking-normal text-sm">{item.subtitle}</Text>
              </div>
          ))}
        </div>
      </Card>

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
    </>
  );
};
