import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import { StarFourIcon } from "@phosphor-icons/react/dist/ssr";
import uiData from "@/data/ui.json";

export const ContactCard: React.FC = () => {
  return (
    <Card className="h-full flex flex-col justify-between p-8 md:p-12 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] opacity-50 z-0"></div>
      
      <div className="relative z-10">
         <div className="mb-8">
            <StarFourIcon size={48} weight="fill" className="text-white/20 absolute -top-8 -left-4" />
         </div>
         <Text variant="h2" weight="medium" className="leading-tight">
            {uiData.common.contactCard.line1}<br/>{uiData.common.contactCard.line2} <span className="text-primary-blue">{uiData.common.contactCard.highlight}</span>
         </Text>
      </div>
      
      <div className="relative z-10 mt-8 self-end">
        <ArrowButton href="/contact" />
      </div>
    </Card>
  );
};
