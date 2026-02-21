import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import { IconBox } from "@/components/ui/atoms/IconBox/IconBox";
import { LaptopIcon, CodeIcon, CirclesThreeIcon, ChartBarIcon } from "@phosphor-icons/react/dist/ssr";
import servicesData from "@/data/services.json";
import uiData from "@/data/ui.json";
import { Icon } from "@phosphor-icons/react";

const iconMap: Record<string, Icon> = {
  "Website Development": CodeIcon,
  "Website Management": LaptopIcon,
  "SEO Optimization": ChartBarIcon,
  "default": CirclesThreeIcon
};

export const ServicesCard: React.FC = () => {
  const displayedServices = servicesData.slice(0, 4);

  return (
    <Card className="h-full flex flex-col justify-between group">
      <div className="flex items-center justify-between mb-8 gap-2">
         {displayedServices.map((service, index) => {
            const Icon = iconMap[service.label] || iconMap.default;
            return <IconBox key={index} icon={Icon} />;
         })}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <Text variant="caption" color="gray" className="mb-1">{uiData.home.servicesCard.subtitle}</Text>
          <Text variant="h4" weight="medium">{uiData.home.servicesCard.title}</Text>
        </div>
        <ArrowButton href="/services" />
      </div>
    </Card>
  );
};
