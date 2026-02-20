import React from "react";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ContactItemProps } from "./ContactInfo.types";

export const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, title, details }) => {
  return (
    <div className="flex items-start gap-6 mb-8">
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/5 shadow-lg shrink-0">
        <Icon size={28} weight="light" className="text-white/70" />
      </div>
      
      <div className="flex flex-col gap-1">
        <Text variant="caption" color="gray" className="mb-1">{title}</Text>
        {details.map((detail, index) => (
            <Text key={index} variant="h4" weight="medium" className="text-white text-lg md:text-xl">
                {detail}
            </Text>
        ))}
      </div>
    </div>
  );
};
