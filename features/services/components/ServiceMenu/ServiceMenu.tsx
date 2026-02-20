import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ServiceMenuProps } from "../../types/services";

export const ServiceMenu: React.FC<ServiceMenuProps> = ({ items, className = "" }) => {
  return (
    <Card className={`p-8 md:p-12 h-full flex flex-col justify-center gap-12 bg-[#1a1a1a] ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-6 group cursor-pointer">
           <item.icon size={32} className="text-white/50 group-hover:text-white transition-colors" />
           <Text variant="h4" weight="medium" className="text-white/50 group-hover:text-white transition-colors uppercase text-sm md:text-base tracking-wider">
             {item.title}
           </Text>
        </div>
      ))}
    </Card>
  );
};
