import React from "react";
import { Text } from "@/components/ui/atoms/Text/Text";
import { StarFour, Camera, PenNib, CirclesThree, Laptop, Code, ChartBar } from "@phosphor-icons/react/dist/ssr";
import { ServiceMenu } from "./ServiceMenu/ServiceMenu";
import { ServiceOfferings } from "./ServiceOfferings/ServiceOfferings";
import { ProfilesCard } from "@/components/ui/organisms/ProfilesCard/ProfilesCard";
import { ContactCard } from "@/components/ui/organisms/ContactCard/ContactCard";
import { CredentialsCard } from "@/components/ui/organisms/CredentialsCard/CredentialsCard";
import { ServiceItem } from "../types/services";
import servicesData from "@/data/services.json";
import uiData from "@/data/ui.json";
import { Icon } from "@phosphor-icons/react";

const iconMap: Record<string, Icon> = {
  "Website Development": Code,
  "Website Management": Laptop,
  "SEO Optimization": ChartBar,
  "default": CirclesThree
};

const serviceItems: ServiceItem[] = servicesData.map(service => ({
    icon: iconMap[service.label] || iconMap.default,
    title: service.label,
    description: service.description
}));

export const Services: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-12 md:pt-24">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
         {/* Left Column: Menu */}
         <div className="col-span-1">
            <ServiceMenu items={serviceItems} />
         </div>

         {/* Right Column: Offerings */}
         <div className="col-span-1 lg:col-span-2 flex flex-col gap-12">
            <div className="flex items-center justify-center gap-4">
                <StarFour size={40} weight="fill" className="text-white/30" />
                <Text variant="h1" weight="bold" className="uppercase tracking-wide text-4xl md:text-6xl text-white">{uiData.services.offerings.title}</Text>
                <StarFour size={40} weight="fill" className="text-white/30" />
            </div>
            
            <ServiceOfferings items={serviceItems} />
         </div>
      </div>

      {/* Bottom Section: Grid of 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="col-span-1">
            <ProfilesCard />
         </div>
         <div className="col-span-1 md:col-span-2">
            <ContactCard />
         </div>
         <div className="col-span-1">
            <CredentialsCard />
         </div>
      </div>
    </main>
  );
};
