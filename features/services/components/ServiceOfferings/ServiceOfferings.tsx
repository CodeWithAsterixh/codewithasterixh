import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ServiceOfferingProps } from "../../types/services";

export const ServiceOfferings: React.FC<ServiceOfferingProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, index) => (
        <Card key={index} className="p-8 bg-[#1a1a1a] flex flex-col gap-4 group hover:bg-[#212121] transition-colors">
            <Text variant="caption" color="gray" className="uppercase tracking-wider text-xs md:text-sm mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                {item.title}
            </Text>
            <Text variant="body" color="gray" className="leading-relaxed text-sm md:text-base opacity-60 group-hover:opacity-90 transition-opacity">
                {item.description}
            </Text>
        </Card>
      ))}
    </div>
  );
};
